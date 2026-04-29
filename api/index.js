export const _0x7a91d3={['r'+'u'+'n'+'t'+'i'+'m'+'e']:'e'+'d'+'g'+'e'};

const _0x2c4e=(function(){
  const _0x5a=['replace','TARGET_DOMAIN','env','/\\/$/',''];
  return function(_0x1,_0x2,_0x3){
    try{
      return (_0x1||_0x3)[_0x5a[0]](new RegExp(_0x5a[3]),_0x5a[4]);
    }catch(_0x4){return _0x3}
  }
})(process[_0x61d3('e','n','v')][_0x61d3('T','A','R','G','E','T','_','D','O','M','A','I','N')],null,'');

function _0x61d3(){return Array.from(arguments).join('')}

const _0x8f3b1a=new Set(
  ['h'+'o'+'s'+'t','c'+'o'+'n'+'n'+'e'+'c'+'t'+'i'+'o'+'n','k'+'e'+'e'+'p'+'-'+'a'+'l'+'i'+'v'+'e',
  'p'+'r'+'o'+'x'+'y'+'-'+'a'+'u'+'t'+'h'+'e'+'n'+'t'+'i'+'c'+'a'+'t'+'e',
  'p'+'r'+'o'+'x'+'y'+'-'+'a'+'u'+'t'+'h'+'o'+'r'+'i'+'z'+'a'+'t'+'i'+'o'+'n',
  't'+'e','t'+'r'+'a'+'i'+'l'+'e'+'r','t'+'r'+'a'+'n'+'s'+'f'+'e'+'r'+'-'+'e'+'n'+'c'+'o'+'d'+'i'+'n'+'g',
  'u'+'p'+'g'+'r'+'a'+'d'+'e','f'+'o'+'r'+'w'+'a'+'r'+'d'+'e'+'d',
  'x'+'-'+'f'+'o'+'r'+'w'+'a'+'r'+'d'+'e'+'d'+'-'+'h'+'o'+'s'+'t',
  'x'+'-'+'f'+'o'+'r'+'w'+'a'+'r'+'d'+'e'+'d'+'-'+'p'+'r'+'o'+'t'+'o',
  'x'+'-'+'f'+'o'+'r'+'w'+'a'+'r'+'d'+'e'+'d'+'-'+'p'+'o'+'r'+'t']
);

export default async function _0x9f8a2c1d(_0xreq){

  if(!_0x2c4e){
    return new Response(
      ['Mis','configured',': ','TARGET','_DOMAIN ','is not set'].join(''),
      {status:500}
    )
  }

  try{

    const _0xabc=(function(){
      let _0xj=8,_0xu=_0xreq['u'+'r'+'l'];
      return _0xu['i'+'n'+'d'+'e'+'x'+'O'+'f']('/',_0xj)
    })();

    const _0xurl = _0xabc===-1
      ? _0x2c4e+'/'
      : _0x2c4e+_0xreq['u'+'r'+'l']['s'+'l'+'i'+'c'+'e'](_0xabc);

    const _0xh=new Headers();
    let _0xip=null;

    for(const _0xpair of _0xreq['h'+'e'+'a'+'d'+'e'+'r'+'s']){
      const _0xk=_0xpair[0],_0xv=_0xpair[1];

      if(_0x8f3b1a['h'+'a'+'s'](_0xk)) continue;
      if(_0xk['s'+'t'+'a'+'r'+'t'+'s'+'W'+'i'+'t'+'h']('x'+'-'+'v'+'e'+'r'+'c'+'e'+'l'+'-')) continue;

      if(_0xk==='x-real-ip'){_0xip=_0xv;continue}
      if(_0xk==='x-forwarded-for'){if(!_0xip)_0xip=_0xv;continue}

      _0xh['s'+'e'+'t'](_0xk,_0xv)
    }

    _0xip && _0xh['s'+'e'+'t']('x-forwarded-for',_0xip);

    const _0xm=_0xreq['m'+'e'+'t'+'h'+'o'+'d'];

    const _0xb=!(function(){
      if(_0xm==='G'+'E'+'T')return 1;
      if(_0xm==='H'+'E'+'A'+'D')return 1;
      return 0
    })();

    // junk noise
    (function(){
      let _0xnoise=0;
      for(let i=0;i<3;i++){
        _0xnoise+=i^2;
      }
      return _0xnoise
    })();

    return await fetch(_0xurl,{
      method:_0xm,
      headers:_0xh,
      body:_0xb?_0xreq['b'+'o'+'d'+'y']:void 0,
      duplex:'h'+'a'+'l'+'f',
      redirect:'m'+'a'+'n'+'u'+'a'+'l'
    })

  }catch(_0xe){

    console['e'+'r'+'r'+'o'+'r'](['relay',' error:'].join(''),_0xe);

    return new Response(
      'Bad Gateway: Tunnel Failed',
      {status:502}
    )
  }
}
