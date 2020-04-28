/*
 Highcharts JS v8.0.4 (2020-04-28)

 Solid angular gauge module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/solid-gauge",["highcharts","highcharts/highcharts-more"],function(h){b(h);b.Highcharts=h;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function h(b,r,h,g){b.hasOwnProperty(r)||(b[r]=g.apply(null,h))}b=b?b._modules:{};h(b,"modules/solid-gauge.src.js",[b["parts/Globals.js"],b["parts/Color.js"],b["mixins/legend-symbol.js"],
b["parts/Utilities.js"]],function(b,h,x,g){var k=h.parse,r=g.clamp,u=g.extend,v=g.isNumber,y=g.merge,t=g.pick,w=g.pInt;h=g.seriesType;g=g.wrap;g(b.Renderer.prototype.symbols,"arc",function(a,d,b,e,m,c){a=a(d,b,e,m,c);c.rounded&&(e=((c.r||e)-(c.innerR||0))/2,d=a[0],c=a[2],"M"===d[0]&&"L"===c[0]&&(d=["A",e,e,0,1,1,d[1],d[2]],a[2]=["A",e,e,0,1,1,c[1],c[2]],a[4]=d));return a});var z={initDataClasses:function(a){var d=this.chart,b,e=0,m=this.options;this.dataClasses=b=[];a.dataClasses.forEach(function(c,
f){c=y(c);b.push(c);c.color||("category"===m.dataClassColor?(f=d.options.colors,c.color=f[e++],e===f.length&&(e=0)):c.color=k(m.minColor).tweenTo(k(m.maxColor),f/(a.dataClasses.length-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(a){a.color=k(a[1])})},toColor:function(a,b){var f=this.stops,e=this.dataClasses,d;if(e)for(d=e.length;d--;){var c=e[d];var g=c.from;f=c.to;if(("undefined"===typeof g||a>=g)&&("undefined"===
typeof f||a<=f)){var h=c.color;b&&(b.dataClass=d);break}}else{this.logarithmic&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min);for(d=f.length;d--&&!(a>f[d][0]););g=f[d]||f[d+1];f=f[d+1]||g;a=1-(f[0]-a)/(f[0]-g[0]||1);h=g.color.tweenTo(f.color,a)}return h}};h("solidgauge","gauge",{colorByPoint:!0,dataLabels:{y:0}},{drawLegendSymbol:x.drawRectangle,translate:function(){var a=this.yAxis;u(a,z);!a.dataClasses&&a.options.dataClasses&&a.initDataClasses(a.options);a.initStops(a.options);b.seriesTypes.gauge.prototype.translate.call(this)},
drawPoints:function(){var a=this,b=a.yAxis,f=b.center,e=a.options,g=a.chart.renderer,c=e.overshoot,h=v(c)?c/180*Math.PI:0,k;v(e.threshold)&&(k=b.startAngleRad+b.translate(e.threshold,null,null,null,!0));this.thresholdAngleRad=t(k,b.startAngleRad);a.points.forEach(function(c){if(!c.isNull){var d=c.graphic,l=b.startAngleRad+b.translate(c.y,null,null,null,!0),k=w(t(c.options.radius,e.radius,100))*f[2]/200,n=w(t(c.options.innerRadius,e.innerRadius,60))*f[2]/200,p=b.toColor(c.y,c),q=Math.min(b.startAngleRad,
b.endAngleRad),m=Math.max(b.startAngleRad,b.endAngleRad);"none"===p&&(p=c.color||a.color||"none");"none"!==p&&(c.color=p);l=r(l,q-h,m+h);!1===e.wrap&&(l=r(l,q,m));q=Math.min(l,a.thresholdAngleRad);l=Math.max(l,a.thresholdAngleRad);l-q>2*Math.PI&&(l=q+2*Math.PI);c.shapeArgs=n={x:f[0],y:f[1],r:k,innerR:n,start:q,end:l,rounded:e.rounded};c.startR=k;d?(k=n.d,d.animate(u({fill:p},n)),k&&(n.d=k)):c.graphic=d=g.arc(n).attr({fill:p,"sweep-flag":0}).add(a.group);a.chart.styledMode||("square"!==e.linecap&&
d.attr({"stroke-linecap":"round","stroke-linejoin":"round"}),d.attr({stroke:e.borderColor||"none","stroke-width":e.borderWidth||0}));d&&d.addClass(c.getClassName(),!0)}})},animate:function(a){a||(this.startAngleRad=this.thresholdAngleRad,b.seriesTypes.pie.prototype.animate.call(this,a))}});""});h(b,"masters/modules/solid-gauge.src.js",[],function(){})});
//# sourceMappingURL=solid-gauge.js.map