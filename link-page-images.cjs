const fs = require('fs');
const path = require('path');
const root = __dirname;
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => e.name.startsWith('.') || e.name==='node_modules' ? [] : e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
let count=0;
for(const file of walk(root).filter(f=>f.endsWith('.html'))) {
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes('</head>') || html.includes('assets/js/page-images.js')) continue;
  const prefix=path.relative(path.dirname(file),root).replace(/\\/g,'/');
  const asset=(prefix ? prefix+'/' : '')+'assets/';
  html=html.replace('</head>',`<link rel="stylesheet" href="${asset}css/page-images.css?v=20260912"><script defer src="${asset}js/page-images.js?v=20260912"></script></head>`);
  fs.writeFileSync(file,html); count++;
}
console.log('Linked image enhancement on '+count+' pages.');
