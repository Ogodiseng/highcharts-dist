/*
 Highstock JS v8.0.4 (2020-04-28)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/volume-by-price",["highcharts","highcharts/modules/stock"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(b,m,f,q){b.hasOwnProperty(m)||(b[m]=q.apply(null,f))}b=b?b._modules:{};m(b,"indicators/volume-by-price.src.js",[b["parts/Globals.js"],b["parts/Point.js"],b["parts/Utilities.js"]],
function(b,m,f){var q=f.addEvent,C=f.animObject,z=f.arrayMax,D=f.arrayMin,x=f.correctFloat,y=f.error,E=f.extend,F=f.isArray;f=f.seriesType;var u=Math.abs,A=b.noop,w=b.seriesTypes.column.prototype;f("vbp","sma",{params:{ranges:12,volumeSeriesID:"volume"},zoneLines:{enabled:!0,styles:{color:"#0A9AC9",dashStyle:"LongDash",lineWidth:1}},volumeDivision:{enabled:!0,styles:{positiveColor:"rgba(144, 237, 125, 0.8)",negativeColor:"rgba(244, 91, 91, 0.8)"}},animationLimit:1E3,enableMouseTracking:!1,pointPadding:0,
zIndex:-1,crisp:!0,dataGrouping:{enabled:!1},dataLabels:{allowOverlap:!0,enabled:!0,format:"P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}",padding:0,style:{fontSize:"7px"},verticalAlign:"top"}},{nameBase:"Volume by Price",bindTo:{series:!1,eventName:"afterSetExtremes"},calculateOn:"render",markerAttribs:A,drawGraph:A,getColumnMetrics:w.getColumnMetrics,crispCol:w.crispCol,init:function(c){b.seriesTypes.sma.prototype.init.apply(this,arguments);var a=this.options.params;var h=this.linkedParent;
a=c.get(a.volumeSeriesID);this.addCustomEvents(h,a);return this},addCustomEvents:function(c,a){function h(){e.chart.redraw();e.setData([]);e.zoneStarts=[];e.zoneLinesSVG&&(e.zoneLinesSVG.destroy(),delete e.zoneLinesSVG)}var e=this;e.dataEventsToUnbind.push(q(c,"remove",function(){h()}));a&&e.dataEventsToUnbind.push(q(a,"remove",function(){h()}));return e},animate:function(c){var a=this,h={};c||(h.translateX=a.yAxis.pos,a.group.animate(h,E(C(a.options.animation),{step:function(c,h){a.group.attr({scaleX:Math.max(.001,
h.pos)})}})))},drawPoints:function(){this.options.volumeDivision.enabled&&(this.posNegVolume(!0,!0),w.drawPoints.apply(this,arguments),this.posNegVolume(!1,!1));w.drawPoints.apply(this,arguments)},posNegVolume:function(c,a){var h=a?["positive","negative"]:["negative","positive"],e=this.options.volumeDivision,G=this.points.length,r=[],d=[],k=0,l;c?(this.posWidths=r,this.negWidths=d):(r=this.posWidths,d=this.negWidths);for(;k<G;k++){var g=this.points[k];g[h[0]+"Graphic"]=g.graphic;g.graphic=g[h[1]+
"Graphic"];if(c){var b=g.shapeArgs.width;var p=this.priceZones[k];(l=p.wholeVolumeData)?(r.push(b/l*p.positiveVolumeData),d.push(b/l*p.negativeVolumeData)):(r.push(0),d.push(0))}g.color=a?e.styles.positiveColor:e.styles.negativeColor;g.shapeArgs.width=a?this.posWidths[k]:this.negWidths[k];g.shapeArgs.x=a?g.shapeArgs.x:this.posWidths[k]}},translate:function(){var c=this,a=c.options,h=c.chart,e=c.yAxis,b=e.min,r=c.options.zoneLines,d=c.priceZones,k=0,l,g,B;w.translate.apply(c);var p=c.points;if(p.length){var f=
.5>a.pointPadding?a.pointPadding:.1;a=c.volumeDataArray;var m=z(a);var n=h.plotWidth/2;var H=h.plotTop;var v=u(e.toPixels(b)-e.toPixels(b+c.rangeStep));var q=u(e.toPixels(b)-e.toPixels(b+c.rangeStep));f&&(b=u(v*(1-2*f)),k=u((v-b)/2),v=u(b));p.forEach(function(a,b){g=a.barX=a.plotX=0;B=a.plotY=e.toPixels(d[b].start)-H-(e.reversed?v-q:v)-k;l=x(n*d[b].wholeVolumeData/m);a.pointWidth=l;a.shapeArgs=c.crispCol.apply(c,[g,B,l,v]);a.volumeNeg=d[b].negativeVolumeData;a.volumePos=d[b].positiveVolumeData;a.volumeAll=
d[b].wholeVolumeData});r.enabled&&c.drawZones(h,e,c.zoneStarts,r.styles)}},getValues:function(b,a){var c=b.processedXData,e=b.processedYData,f=this.chart,r=a.ranges,d=[],k=[],l=[],g;if(b.chart)if(g=f.get(a.volumeSeriesID))if((a=F(e[0]))&&4!==e[0].length)y("Type of "+b.name+" series is different than line, OHLC or candlestick.",!0,f);else return(this.priceZones=this.specifyZones(a,c,e,r,g)).forEach(function(b,a){d.push([b.x,b.end]);k.push(d[a][0]);l.push(d[a][1])}),{values:d,xData:k,yData:l};else y("Series "+
a.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,f);else y("Base series not found! In case it has been removed, add a new one.",!0,f)},specifyZones:function(b,a,h,e,f){if(b){var c=h.length;for(var d=h[0][3],k=d,l=1,g;l<c;l++)g=h[l][3],g<d&&(d=g),g>k&&(k=g);c={min:d,max:k}}else c=!1;c=(d=c)?d.min:D(h);g=d?d.max:z(h);d=this.zoneStarts=[];k=[];var m=0;l=1;if(!c||!g)return this.points.length&&(this.setData([]),this.zoneStarts=[],this.zoneLinesSVG.destroy()),[];var p=this.rangeStep=x(g-c)/e;for(d.push(c);m<
e-1;m++)d.push(x(d[m]+p));d.push(g);for(e=d.length;l<e;l++)k.push({index:l-1,x:a[0],start:d[l-1],end:d[l]});return this.volumePerZone(b,k,f,a,h)},volumePerZone:function(b,a,h,e,f){var c=this,d=h.processedXData,k=h.processedYData,l=a.length-1,g=f.length;h=k.length;var m,p,q,t,n;u(g-h)&&(e[0]!==d[0]&&k.unshift(0),e[g-1]!==d[h-1]&&k.push(0));c.volumeDataArray=[];a.forEach(function(a){a.wholeVolumeData=0;a.positiveVolumeData=0;for(n=a.negativeVolumeData=0;n<g;n++)q=p=!1,t=b?f[n][3]:f[n],m=n?b?f[n-1][3]:
f[n-1]:t,t<=a.start&&0===a.index&&(p=!0),t>=a.end&&a.index===l&&(q=!0),(t>a.start||p)&&(t<a.end||q)&&(a.wholeVolumeData+=k[n],m>t?a.negativeVolumeData+=k[n]:a.positiveVolumeData+=k[n]);c.volumeDataArray.push(a.wholeVolumeData)});return a},drawZones:function(b,a,h,e){var c=b.renderer,f=this.zoneLinesSVG,d=[],k=b.plotWidth,l=b.plotTop,g;h.forEach(function(c){g=a.toPixels(c)-l;d=d.concat(b.renderer.crispLine([["M",0,g],["L",k,g]],e.lineWidth))});f?f.animate({d:d}):f=this.zoneLinesSVG=c.path(d).attr({"stroke-width":e.lineWidth,
stroke:e.color,dashstyle:e.dashStyle,zIndex:this.group.zIndex+.1}).add(this.group)}},{destroy:function(){this.negativeGraphic&&(this.negativeGraphic=this.negativeGraphic.destroy());return m.prototype.destroy.apply(this,arguments)}});""});m(b,"masters/indicators/volume-by-price.src.js",[],function(){})});
//# sourceMappingURL=volume-by-price.js.map