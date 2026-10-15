import{B as N,a as Z,w as C,E as X,aJ as K,C as W,x as B,I,O as P,af as _,ae as O,U as j,ac as D,ad as L,ag as V,ah as k,ai as J,X as R}from"./three-CD7a2A0j.js";function H(e){if(!(e.width>0)||!(e.depth>0)||!Number.isFinite(e.width+e.depth))throw new Error("Terrain width and depth must be finite positive meters");const r=o=>{if(!Number.isFinite(o)||o<1)throw new Error("Terrain segments must be positive");return Math.max(1,Math.floor(o))},n=e.segments??80,t=r(typeof n=="number"?n:n.x),a=r(typeof n=="number"?n:n.z),s=e.center?.x??0,i=e.center?.z??0;if(!Number.isFinite(s+i))throw new Error("Terrain center must be finite");const u={minX:s-e.width/2,maxX:s+e.width/2,minZ:i-e.depth/2,maxZ:i+e.depth/2},c=new Float32Array((t+1)*(a+1)*3),y=new Uint8Array((t+1)*(a+1)),U=[];for(let o=0;o<=a;o+=1)for(let l=0;l<=t;l+=1){const m=o*(t+1)+l,v=u.minX+e.width*l/t,d=u.minZ+e.depth*o/a,f=e.height(v,d);c[m*3]=v,c[m*3+1]=f!==null&&Number.isFinite(f)?f:0,c[m*3+2]=d,y[m]=f!==null&&Number.isFinite(f)?1:0}const T=(o,l,m)=>!!(y[o]&&y[l]&&y[m]);for(let o=0;o<a;o+=1)for(let l=0;l<t;l+=1){const m=o*(t+1)+l,v=m+1,d=m+t+1,f=d+1;T(m,d,v)&&U.push(m,d,v),T(v,d,f)&&U.push(v,d,f)}const p=new N;p.setAttribute("position",new Z(c,3)),p.setIndex(U),p.computeVertexNormals(),p.computeBoundingSphere();const A=e.material??new C({color:e.color??6517610,roughness:.94,metalness:0}),M=new X(p,A);M.name=e.name??"Terrain",M.receiveShadow=!0;let F=!1;function G(o,l){if(!Number.isFinite(o+l)||o<u.minX||o>u.maxX||l<u.minZ||l>u.maxZ)return null;const m=(o-u.minX)/e.width*t,v=(l-u.minZ)/e.depth*a,d=Math.min(t-1,Math.floor(m)),h=Math.min(a-1,Math.floor(v))*(t+1)+d,b=h+1,w=h+t+1,z=w+1,x=(o-c[h*3])/(c[b*3]-c[h*3]),g=(l-c[h*3+2])/(c[w*3+2]-c[h*3+2]);return x+g<=1&&T(h,b,w)?c[h*3+1]*(1-x-g)+c[b*3+1]*x+c[w*3+1]*g:x+g>=1&&T(b,w,z)?c[z*3+1]*(x+g-1)+c[w*3+1]*(1-x)+c[b*3+1]*(1-g):null}return{mesh:M,bounds:u,sampleGround:G,dispose(){F||(F=!0,M.removeFromParent(),p.dispose(),e.material||A.dispose())}}}const Q=(e,r,n)=>{const t=R.clamp((n-e)/(r-e),0,1);return t*t*(3-2*t)},E=(e,r=.88)=>new C({color:e,roughness:r});function S(e,r,n,t=0,a=0,s=0){const i=new X(e,r);return i.position.set(t,a,s),i.castShadow=!0,i.receiveShadow=!0,n.add(i),i}function Y(e,r,n,t,a=10){return S(new _(new O([...r]),a,n,7,!1),t,e)}function $(e){let r=e>>>0;return()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296)}function ee(e,r,n,t,a){const s=new I(r,n,t),i=new P;for(let u=0;u<t;u++)i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1),a(u,i),i.updateMatrix(),s.setMatrixAt(u,i.matrix);return s.castShadow=!0,s.receiveShadow=!0,s.computeBoundingSphere(),e.add(s),s}function te(e){const r=new Set,n=new Set;e.traverse(t=>{const a=t;a.geometry&&r.add(a.geometry),a.material&&(Array.isArray(a.material)?a.material:[a.material]).forEach(i=>n.add(i)),t.shadow?.map?.dispose()}),r.forEach(t=>t.dispose()),n.forEach(t=>t.dispose()),e.removeFromParent(),e.clear()}function re(e,r){const n=new K({transparent:r==="water"||r==="tide",depthWrite:r!=="water"&&r!=="tide",side:B,uniforms:{uTime:{value:0},uColor:{value:new W(e)},uKind:{value:["water","tide","cosmos","fold"].indexOf(r)},uActive:{value:0},uComplete:{value:0}},vertexShader:`varying vec2 vUv; varying vec3 vWorld;
      void main() { vUv = uv; vec4 world = modelMatrix * vec4(position, 1.0); vWorld = world.xyz; gl_Position = projectionMatrix * viewMatrix * world; }`,fragmentShader:`uniform float uTime; uniform vec3 uColor; uniform int uKind; uniform float uActive; uniform float uComplete;
      varying vec2 vUv; varying vec3 vWorld;
      float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      void main() {
        vec3 c = uColor; float alpha = 1.0;
        if (uKind == 0) {
          vec2 p = vWorld.xz;
          float ripple = sin(p.x*1.8+p.y*.8-uTime*.35)*sin(p.y*2.6-p.x*.3+uTime*.27);
          float glint = pow(max(0.0, ripple), 7.0);
          float streak = sin(p.y*.25+p.x*.12+uTime*.035)*.5+.5;
          c = mix(c*.68,c*1.12,streak)+vec3(.19,.26,.29)*glint;
          alpha = .70;
        } else if (uKind == 1) {
          float stream = sin(vUv.x*65.0+sin(vUv.y*8.0-uTime*.7)*2.0)*.5+.5;
          float depth = smoothstep(.0,.35,vUv.y)*(1.0-smoothstep(.78,1.0,vUv.y));
          c = mix(vec3(.035,.11,.19),c, .2+stream*.18+depth*.32);
          c += vec3(.12,.34,.38)*pow(stream,12.0);
          alpha = .76 + depth*.18;
        } else if (uKind == 2) {
          vec2 p = vUv*82.0; vec2 cell=floor(p); vec2 local=fract(p)-.5;
          float star=step(.975,hash(cell))*pow(max(0.0,1.0-length(local)*2.3),10.0);
          float cloud=sin(vUv.x*8.0+vUv.y*5.0)*sin(vUv.y*9.0-vUv.x*3.0);
          c=vec3(.019,.028,.068)+uColor*max(.0,cloud)*.16;
          c+=vec3(.68,.78,.91)*star*(.7+.3*sin(uTime*.4+hash(cell)*6.28));
        } else {
          float fold = abs(fract(vUv.x*3.0+vUv.y*1.4)-.5)*2.0;
          c = mix(vec3(.14,.17,.30),uColor,pow(fold,1.8));
          c += vec3(.04,.025,.055)*sin(uTime*.3+vUv.y*9.0);
        }
        c += uActive*vec3(.035,.05,.065)+uComplete*vec3(.04,.035,.012);
        gl_FragColor=vec4(c,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});return{material:n,update(t,a=0,s=0){n.uniforms.uTime.value=t,n.uniforms.uActive.value=a,n.uniforms.uComplete.value=s}}}function ae(){const e=new k;return e.moveTo(0,-.6),e.bezierCurveTo(-.55,-.15,-.45,.3,0,.7),e.bezierCurveTo(.36,.35,.55,-.12,0,-.6),new J(e,{depth:.07,bevelEnabled:!0,bevelSegments:1,bevelSize:.04,bevelThickness:.025,steps:1,curveSegments:6})}function ne(e){const r=new j;e.add(r);const n=E("#e5ddc7",.96),t=S(new D(1.2,.78,.045),n,r);t.rotation.x=-.15;const a=new N;a.setAttribute("position",new L([-.6,.39,.04,.6,.39,.04,0,-.12,.08],3)),a.computeVertexNormals();const s=S(a,new C({color:"#f2ead5",roughness:.94,side:B}),r);return s.rotation.x=-.15,S(new V(.095,.095,.027,12),E("#858777"),r,0,-.075,.081).rotation.x=Math.PI/2,r}export{E as a,ee as b,H as c,ae as d,te as e,re as f,Y as g,$ as h,ne as i,S as m,Q as s};
