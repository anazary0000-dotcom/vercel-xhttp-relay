use futures_util::StreamExt;
use reqwest::{Client, Method};
use std::env;
use std::str::FromStr;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let client = Client::new();
    
    // Pull target from Env Variable
    let target_base = env::var("TARGET_DOMAIN")
        .unwrap_or_else(|_| "http://docker.io".to_string());

    let path_query = req.uri().path_and_query().map(|x| x.as_str()).unwrap_or("");
    let target_url = format!("{}{}", target_base, path_query);

    let method = Method::from_str(req.method().as_str()).unwrap_or(Method::GET);
    let mut proxy_req = client.request(method, &target_url);

    // Forward all headers except host-specific ones
    for (name, value) in req.headers().iter() {
        if name != "host" && name != "x-forwarded-for" && name != "x-real-ip" {
            proxy_req = proxy_req.header(name, value);
        }
    }

    // Pass through the client IP for logging
    if let Some(ip) = req.headers().get("x-real-ip") {
        proxy_req = proxy_req.header("x-forwarded-for", ip);
    }

    let req_body = req.into_body();
    proxy_req = proxy_req.body(req_body);

    let res = match proxy_req.send().await {
        Ok(res) => res,
        Err(_) => return Ok(Response::builder().status(StatusCode::BAD_GATEWAY).body(Body::from("Tunnel Link Broken"))?),
    };

    let mut response_builder = Response::builder().status(res.status().as_u16());
    if let Some(headers) = response_builder.headers_mut() {
        for (name, value) in res.headers().iter() {
            headers.insert(name, value.clone());
        }
    }

    let stream = res.bytes_stream().map(|result| result.map_err(|e| e.to_string()));
    Ok(response_builder.body(Body::from_stream(stream)?)?)
}