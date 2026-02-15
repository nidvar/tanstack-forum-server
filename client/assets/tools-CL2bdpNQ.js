function f(o){const n=new Date,e=typeof o=="string"?new Date(o):o,s=n.getTime()-e.getTime(),a=1e3*60*60*24,t=Math.floor(s/a);return t===0?"Today":t===1?"1 day ago":`${t} days ago`}export{f as t};
