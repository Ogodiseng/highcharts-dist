/*
 Highcharts JS v8.0.4 (2020-04-28)

 Force directed graph module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(h){"object"===typeof module&&module.exports?(h["default"]=h,module.exports=h):"function"===typeof define&&define.amd?define("highcharts/modules/networkgraph",["highcharts"],function(l){h(l);h.Highcharts=l;return h}):h("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(h){function l(g,a,c,e){g.hasOwnProperty(a)||(g[a]=e.apply(null,c))}h=h?h._modules:{};l(h,"mixins/nodes.js",[h["parts/Globals.js"],h["parts/Point.js"],h["parts/Utilities.js"]],function(g,a,c){var e=c.defined,d=c.extend,
f=c.find,m=c.pick;g.NodesMixin={createNode:function(e){function a(b,k){return f(b,function(b){return b.id===k})}var b=a(this.nodes,e),k=this.pointClass;if(!b){var q=this.options.nodes&&a(this.options.nodes,e);b=(new k).init(this,d({className:"highcharts-node",isNode:!0,id:e,y:1},q));b.linksTo=[];b.linksFrom=[];b.formatPrefix="node";b.name=b.name||b.options.id;b.mass=m(b.options.mass,b.options.marker&&b.options.marker.radius,this.options.marker&&this.options.marker.radius,4);b.getSum=function(){var k=
0,e=0;b.linksTo.forEach(function(b){k+=b.weight});b.linksFrom.forEach(function(b){e+=b.weight});return Math.max(k,e)};b.offset=function(k,e){for(var a=0,q=0;q<b[e].length;q++){if(b[e][q]===k)return a;a+=b[e][q].weight}};b.hasShape=function(){var k=0;b.linksTo.forEach(function(b){b.outgoing&&k++});return!b.linksTo.length||k!==b.linksTo.length};this.nodes.push(b)}return b},generatePoints:function(){var a=this.chart,c={};g.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=
0;this.nodes.forEach(function(b){b.linksFrom.length=0;b.linksTo.length=0;b.level=b.options.level});this.points.forEach(function(b){e(b.from)&&(c[b.from]||(c[b.from]=this.createNode(b.from)),c[b.from].linksFrom.push(b),b.fromNode=c[b.from],a.styledMode?b.colorIndex=m(b.options.colorIndex,c[b.from].colorIndex):b.color=b.options.color||c[b.from].color);e(b.to)&&(c[b.to]||(c[b.to]=this.createNode(b.to)),c[b.to].linksTo.push(b),b.toNode=c[b.to]);b.name=b.name||b.id},this);this.nodeLookup=c},setData:function(){this.nodes&&
(this.nodes.forEach(function(e){e.destroy()}),this.nodes.length=0);g.Series.prototype.setData.apply(this,arguments)},destroy:function(){this.data=[].concat(this.points||[],this.nodes);return g.Series.prototype.destroy.apply(this,arguments)},setNodeState:function(e){var c=arguments,b=this.isNode?this.linksTo.concat(this.linksFrom):[this.fromNode,this.toNode];"select"!==e&&b.forEach(function(b){b&&b.series&&(a.prototype.setState.apply(b,c),b.isNode||(b.fromNode.graphic&&a.prototype.setState.apply(b.fromNode,
c),b.toNode&&b.toNode.graphic&&a.prototype.setState.apply(b.toNode,c)))});a.prototype.setState.apply(this,c)}}});l(h,"modules/networkgraph/integrations.js",[h["parts/Globals.js"]],function(g){g.networkgraphIntegrations={verlet:{attractiveForceFunction:function(a,c){return(c-a)/a},repulsiveForceFunction:function(a,c){return(c-a)/a*(c>a?1:0)},barycenter:function(){var a=this.options.gravitationalConstant,c=this.barycenter.xFactor,e=this.barycenter.yFactor;c=(c-(this.box.left+this.box.width)/2)*a;e=
(e-(this.box.top+this.box.height)/2)*a;this.nodes.forEach(function(a){a.fixedPosition||(a.plotX-=c/a.mass/a.degree,a.plotY-=e/a.mass/a.degree)})},repulsive:function(a,c,e){c=c*this.diffTemperature/a.mass/a.degree;a.fixedPosition||(a.plotX+=e.x*c,a.plotY+=e.y*c)},attractive:function(a,c,e){var d=a.getMass(),f=-e.x*c*this.diffTemperature;c=-e.y*c*this.diffTemperature;a.fromNode.fixedPosition||(a.fromNode.plotX-=f*d.fromNode/a.fromNode.degree,a.fromNode.plotY-=c*d.fromNode/a.fromNode.degree);a.toNode.fixedPosition||
(a.toNode.plotX+=f*d.toNode/a.toNode.degree,a.toNode.plotY+=c*d.toNode/a.toNode.degree)},integrate:function(a,c){var e=-a.options.friction,d=a.options.maxSpeed,f=(c.plotX+c.dispX-c.prevX)*e;e*=c.plotY+c.dispY-c.prevY;var m=Math.abs,g=m(f)/(f||1);m=m(e)/(e||1);f=g*Math.min(d,Math.abs(f));e=m*Math.min(d,Math.abs(e));c.prevX=c.plotX+c.dispX;c.prevY=c.plotY+c.dispY;c.plotX+=f;c.plotY+=e;c.temperature=a.vectorLength({x:f,y:e})},getK:function(a){return Math.pow(a.box.width*a.box.height/a.nodes.length,.5)}},
euler:{attractiveForceFunction:function(a,c){return a*a/c},repulsiveForceFunction:function(a,c){return c*c/a},barycenter:function(){var a=this.options.gravitationalConstant,c=this.barycenter.xFactor,e=this.barycenter.yFactor;this.nodes.forEach(function(d){if(!d.fixedPosition){var f=d.getDegree();f*=1+f/2;d.dispX+=(c-d.plotX)*a*f/d.degree;d.dispY+=(e-d.plotY)*a*f/d.degree}})},repulsive:function(a,c,e,d){a.dispX+=e.x/d*c/a.degree;a.dispY+=e.y/d*c/a.degree},attractive:function(a,c,e,d){var f=a.getMass(),
m=e.x/d*c;c*=e.y/d;a.fromNode.fixedPosition||(a.fromNode.dispX-=m*f.fromNode/a.fromNode.degree,a.fromNode.dispY-=c*f.fromNode/a.fromNode.degree);a.toNode.fixedPosition||(a.toNode.dispX+=m*f.toNode/a.toNode.degree,a.toNode.dispY+=c*f.toNode/a.toNode.degree)},integrate:function(a,c){c.dispX+=c.dispX*a.options.friction;c.dispY+=c.dispY*a.options.friction;var e=c.temperature=a.vectorLength({x:c.dispX,y:c.dispY});0!==e&&(c.plotX+=c.dispX/e*Math.min(Math.abs(c.dispX),a.temperature),c.plotY+=c.dispY/e*Math.min(Math.abs(c.dispY),
a.temperature))},getK:function(a){return Math.pow(a.box.width*a.box.height/a.nodes.length,.3)}}}});l(h,"modules/networkgraph/QuadTree.js",[h["parts/Globals.js"],h["parts/Utilities.js"]],function(g,a){a=a.extend;var c=g.QuadTreeNode=function(a){this.box=a;this.boxSize=Math.min(a.width,a.height);this.nodes=[];this.body=this.isInternal=!1;this.isEmpty=!0};a(c.prototype,{insert:function(a,d){this.isInternal?this.nodes[this.getBoxPosition(a)].insert(a,d-1):(this.isEmpty=!1,this.body?d?(this.isInternal=
!0,this.divideBox(),!0!==this.body&&(this.nodes[this.getBoxPosition(this.body)].insert(this.body,d-1),this.body=!0),this.nodes[this.getBoxPosition(a)].insert(a,d-1)):(d=new c({top:a.plotX,left:a.plotY,width:.1,height:.1}),d.body=a,d.isInternal=!1,this.nodes.push(d)):(this.isInternal=!1,this.body=a))},updateMassAndCenter:function(){var a=0,c=0,f=0;this.isInternal?(this.nodes.forEach(function(e){e.isEmpty||(a+=e.mass,c+=e.plotX*e.mass,f+=e.plotY*e.mass)}),c/=a,f/=a):this.body&&(a=this.body.mass,c=this.body.plotX,
f=this.body.plotY);this.mass=a;this.plotX=c;this.plotY=f},divideBox:function(){var a=this.box.width/2,d=this.box.height/2;this.nodes[0]=new c({left:this.box.left,top:this.box.top,width:a,height:d});this.nodes[1]=new c({left:this.box.left+a,top:this.box.top,width:a,height:d});this.nodes[2]=new c({left:this.box.left+a,top:this.box.top+d,width:a,height:d});this.nodes[3]=new c({left:this.box.left,top:this.box.top+d,width:a,height:d})},getBoxPosition:function(a){var c=a.plotY<this.box.top+this.box.height/
2;return a.plotX<this.box.left+this.box.width/2?c?0:3:c?1:2}});g=g.QuadTree=function(a,d,f,g){this.box={left:a,top:d,width:f,height:g};this.maxDepth=25;this.root=new c(this.box,"0");this.root.isInternal=!0;this.root.isRoot=!0;this.root.divideBox()};a(g.prototype,{insertNodes:function(a){a.forEach(function(a){this.root.insert(a,this.maxDepth)},this)},visitNodeRecursive:function(a,c,f){var e;a||(a=this.root);a===this.root&&c&&(e=c(a));!1!==e&&(a.nodes.forEach(function(a){if(a.isInternal){c&&(e=c(a));
if(!1===e)return;this.visitNodeRecursive(a,c,f)}else a.body&&c&&c(a.body);f&&f(a)},this),a===this.root&&f&&f(a))},calculateMassAndCenter:function(){this.visitNodeRecursive(null,null,function(a){a.updateMassAndCenter()})}})});l(h,"modules/networkgraph/layouts.js",[h["parts/Globals.js"],h["parts/Utilities.js"]],function(g,a){var c=a.addEvent,e=a.clamp,d=a.defined,f=a.extend,h=a.isFunction,p=a.pick,n=a.setAnimation;a=g.Chart;g.layouts={"reingold-fruchterman":function(){}};f(g.layouts["reingold-fruchterman"].prototype,
{init:function(b){this.options=b;this.nodes=[];this.links=[];this.series=[];this.box={x:0,y:0,width:0,height:0};this.setInitialRendering(!0);this.integration=g.networkgraphIntegrations[b.integration];this.enableSimulation=b.enableSimulation;this.attractiveForce=p(b.attractiveForce,this.integration.attractiveForceFunction);this.repulsiveForce=p(b.repulsiveForce,this.integration.repulsiveForceFunction);this.approximation=b.approximation},updateSimulation:function(b){this.enableSimulation=p(b,this.options.enableSimulation)},
start:function(){var b=this.series,a=this.options;this.currentStep=0;this.forces=b[0]&&b[0].forces||[];this.chart=b[0]&&b[0].chart;this.initialRendering&&(this.initPositions(),b.forEach(function(b){b.finishedAnimating=!0;b.render()}));this.setK();this.resetSimulation(a);this.enableSimulation&&this.step()},step:function(){var b=this,a=this.series;b.currentStep++;"barnes-hut"===b.approximation&&(b.createQuadTree(),b.quadTree.calculateMassAndCenter());b.forces.forEach(function(a){b[a+"Forces"](b.temperature)});
b.applyLimits(b.temperature);b.temperature=b.coolDown(b.startTemperature,b.diffTemperature,b.currentStep);b.prevSystemTemperature=b.systemTemperature;b.systemTemperature=b.getSystemTemperature();b.enableSimulation&&(a.forEach(function(b){b.chart&&b.render()}),b.maxIterations--&&isFinite(b.temperature)&&!b.isStable()?(b.simulation&&g.win.cancelAnimationFrame(b.simulation),b.simulation=g.win.requestAnimationFrame(function(){b.step()})):b.simulation=!1)},stop:function(){this.simulation&&g.win.cancelAnimationFrame(this.simulation)},
setArea:function(b,a,c,e){this.box={left:b,top:a,width:c,height:e}},setK:function(){this.k=this.options.linkLength||this.integration.getK(this)},addElementsToCollection:function(b,a){b.forEach(function(b){-1===a.indexOf(b)&&a.push(b)})},removeElementFromCollection:function(b,a){b=a.indexOf(b);-1!==b&&a.splice(b,1)},clear:function(){this.nodes.length=0;this.links.length=0;this.series.length=0;this.resetSimulation()},resetSimulation:function(){this.forcedStop=!1;this.systemTemperature=0;this.setMaxIterations();
this.setTemperature();this.setDiffTemperature()},setMaxIterations:function(b){this.maxIterations=p(b,this.options.maxIterations)},setTemperature:function(){this.temperature=this.startTemperature=Math.sqrt(this.nodes.length)},setDiffTemperature:function(){this.diffTemperature=this.startTemperature/(this.options.maxIterations+1)},setInitialRendering:function(b){this.initialRendering=b},createQuadTree:function(){this.quadTree=new g.QuadTree(this.box.left,this.box.top,this.box.width,this.box.height);
this.quadTree.insertNodes(this.nodes)},initPositions:function(){var b=this.options.initialPositions;h(b)?(b.call(this),this.nodes.forEach(function(b){d(b.prevX)||(b.prevX=b.plotX);d(b.prevY)||(b.prevY=b.plotY);b.dispX=0;b.dispY=0})):"circle"===b?this.setCircularPositions():this.setRandomPositions()},setCircularPositions:function(){function b(a){a.linksFrom.forEach(function(a){g[a.toNode.id]||(g[a.toNode.id]=!0,f.push(a.toNode),b(a.toNode))})}var a=this.box,c=this.nodes,e=2*Math.PI/(c.length+1),d=
c.filter(function(b){return 0===b.linksTo.length}),f=[],g={},h=this.options.initialPositionRadius;d.forEach(function(a){f.push(a);b(a)});f.length?c.forEach(function(b){-1===f.indexOf(b)&&f.push(b)}):f=c;f.forEach(function(b,c){b.plotX=b.prevX=p(b.plotX,a.width/2+h*Math.cos(c*e));b.plotY=b.prevY=p(b.plotY,a.height/2+h*Math.sin(c*e));b.dispX=0;b.dispY=0})},setRandomPositions:function(){function b(b){b=b*b/Math.PI;return b-=Math.floor(b)}var a=this.box,c=this.nodes,e=c.length+1;c.forEach(function(c,
k){c.plotX=c.prevX=p(c.plotX,a.width*b(k));c.plotY=c.prevY=p(c.plotY,a.height*b(e+k));c.dispX=0;c.dispY=0})},force:function(b){this.integration[b].apply(this,Array.prototype.slice.call(arguments,1))},barycenterForces:function(){this.getBarycenter();this.force("barycenter")},getBarycenter:function(){var b=0,a=0,c=0;this.nodes.forEach(function(k){a+=k.plotX*k.mass;c+=k.plotY*k.mass;b+=k.mass});return this.barycenter={x:a,y:c,xFactor:a/b,yFactor:c/b}},barnesHutApproximation:function(b,a){var c=this.getDistXY(b,
a),k=this.vectorLength(c);if(b!==a&&0!==k)if(a.isInternal)if(a.boxSize/k<this.options.theta&&0!==k){var e=this.repulsiveForce(k,this.k);this.force("repulsive",b,e*a.mass,c,k);var d=!1}else d=!0;else e=this.repulsiveForce(k,this.k),this.force("repulsive",b,e*a.mass,c,k);return d},repulsiveForces:function(){var b=this;"barnes-hut"===b.approximation?b.nodes.forEach(function(a){b.quadTree.visitNodeRecursive(null,function(c){return b.barnesHutApproximation(a,c)})}):b.nodes.forEach(function(a){b.nodes.forEach(function(c){if(a!==
c&&!a.fixedPosition){var k=b.getDistXY(a,c);var e=b.vectorLength(k);if(0!==e){var q=b.repulsiveForce(e,b.k);b.force("repulsive",a,q*c.mass,k,e)}}})})},attractiveForces:function(){var b=this,a,c,e;b.links.forEach(function(k){k.fromNode&&k.toNode&&(a=b.getDistXY(k.fromNode,k.toNode),c=b.vectorLength(a),0!==c&&(e=b.attractiveForce(c,b.k),b.force("attractive",k,e,a,c)))})},applyLimits:function(){var b=this;b.nodes.forEach(function(a){a.fixedPosition||(b.integration.integrate(b,a),b.applyLimitBox(a,b.box),
a.dispX=0,a.dispY=0)})},applyLimitBox:function(b,a){var c=b.radius;b.plotX=e(b.plotX,a.left+c,a.width-c);b.plotY=e(b.plotY,a.top+c,a.height-c)},coolDown:function(b,a,c){return b-a*c},isStable:function(){return.00001>Math.abs(this.systemTemperature-this.prevSystemTemperature)||0>=this.temperature},getSystemTemperature:function(){return this.nodes.reduce(function(b,a){return b+a.temperature},0)},vectorLength:function(b){return Math.sqrt(b.x*b.x+b.y*b.y)},getDistR:function(b,a){b=this.getDistXY(b,a);
return this.vectorLength(b)},getDistXY:function(b,a){var c=b.plotX-a.plotX;b=b.plotY-a.plotY;return{x:c,y:b,absX:Math.abs(c),absY:Math.abs(b)}}});c(a,"predraw",function(){this.graphLayoutsLookup&&this.graphLayoutsLookup.forEach(function(b){b.stop()})});c(a,"render",function(){function b(b){b.maxIterations--&&isFinite(b.temperature)&&!b.isStable()&&!b.enableSimulation&&(b.beforeStep&&b.beforeStep(),b.step(),c=!1,a=!0)}var a=!1;if(this.graphLayoutsLookup){n(!1,this);for(this.graphLayoutsLookup.forEach(function(b){b.start()});!c;){var c=
!0;this.graphLayoutsLookup.forEach(b)}a&&this.series.forEach(function(b){b&&b.layout&&b.render()})}});c(a,"beforePrint",function(){this.graphLayoutsLookup.forEach(function(b){b.updateSimulation(!1)});this.redraw()});c(a,"afterPrint",function(){this.graphLayoutsLookup.forEach(function(b){b.updateSimulation()});this.redraw()})});l(h,"modules/networkgraph/draggable-nodes.js",[h["parts/Globals.js"],h["parts/Utilities.js"]],function(g,a){var c=a.addEvent;a=g.Chart;g.dragNodesMixin={onMouseDown:function(a,
c){c=this.chart.pointer.normalize(c);a.fixedPosition={chartX:c.chartX,chartY:c.chartY,plotX:a.plotX,plotY:a.plotY};a.inDragMode=!0},onMouseMove:function(a,c){if(a.fixedPosition&&a.inDragMode){var e=this.chart,d=e.pointer.normalize(c);c=a.fixedPosition.chartX-d.chartX;d=a.fixedPosition.chartY-d.chartY;if(5<Math.abs(c)||5<Math.abs(d))c=a.fixedPosition.plotX-c,d=a.fixedPosition.plotY-d,e.isInsidePlot(c,d)&&(a.plotX=c,a.plotY=d,a.hasDragged=!0,this.redrawHalo(a),this.layout.simulation?this.layout.resetSimulation():
(this.layout.setInitialRendering(!1),this.layout.enableSimulation?this.layout.start():this.layout.setMaxIterations(1),this.chart.redraw(),this.layout.setInitialRendering(!0)))}},onMouseUp:function(a,c){a.fixedPosition&&a.hasDragged&&(this.layout.enableSimulation?this.layout.start():this.chart.redraw(),a.inDragMode=a.hasDragged=!1,this.options.fixedDraggable||delete a.fixedPosition)},redrawHalo:function(a){a&&this.halo&&this.halo.attr({d:a.haloPath(this.options.states.hover.halo.size)})}};c(a,"load",
function(){var a=this,d,f,g;a.container&&(d=c(a.container,"mousedown",function(e){var d=a.hoverPoint;d&&d.series&&d.series.hasDraggableNodes&&d.series.options.draggable&&(d.series.onMouseDown(d,e),f=c(a.container,"mousemove",function(a){return d&&d.series&&d.series.onMouseMove(d,a)}),g=c(a.container.ownerDocument,"mouseup",function(a){f();g();return d&&d.series&&d.series.onMouseUp(d,a)}))}));c(a,"destroy",function(){d()})})});l(h,"modules/networkgraph/networkgraph.src.js",[h["parts/Globals.js"],h["parts/Point.js"],
h["parts/Utilities.js"]],function(g,a,c){"";var e=c.addEvent,d=c.css,f=c.defined,h=c.pick;c=c.seriesType;var l=g.seriesTypes,n=g.Series,b=g.dragNodesMixin;c("networkgraph","line",{stickyTracking:!1,inactiveOtherPoints:!0,marker:{enabled:!0,states:{inactive:{opacity:.3,animation:{duration:50}}}},states:{inactive:{linkOpacity:.3,animation:{duration:50}}},dataLabels:{formatter:function(){return this.key},linkFormatter:function(){return this.point.fromNode.name+"<br>"+this.point.toNode.name},linkTextPath:{enabled:!0},
textPath:{enabled:!1}},link:{color:"rgba(100, 100, 100, 0.5)",width:1},draggable:!0,layoutAlgorithm:{initialPositions:"circle",initialPositionRadius:1,enableSimulation:!1,theta:.5,maxSpeed:10,approximation:"none",type:"reingold-fruchterman",integration:"euler",maxIterations:1E3,gravitationalConstant:.0625,friction:-.981},showInLegend:!1},{forces:["barycenter","repulsive","attractive"],hasDraggableNodes:!0,drawGraph:null,isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,pointArrayMap:["from",
"to"],trackerGroups:["group","markerGroup","dataLabelsGroup"],drawTracker:g.TrackerMixin.drawTrackerPoint,animate:null,buildKDTree:g.noop,createNode:g.NodesMixin.createNode,destroy:function(){this.layout.removeElementFromCollection(this,this.layout.series);g.NodesMixin.destroy.call(this)},init:function(){n.prototype.init.apply(this,arguments);e(this,"updatedData",function(){this.layout&&this.layout.stop()});return this},generatePoints:function(){var a;g.NodesMixin.generatePoints.apply(this,arguments);
this.options.nodes&&this.options.nodes.forEach(function(a){this.nodeLookup[a.id]||(this.nodeLookup[a.id]=this.createNode(a.id))},this);for(a=this.nodes.length-1;0<=a;a--){var b=this.nodes[a];b.degree=b.getDegree();b.radius=h(b.marker&&b.marker.radius,this.options.marker&&this.options.marker.radius,0);this.nodeLookup[b.id]||b.remove()}this.data.forEach(function(a){a.formatPrefix="link"});this.indexateNodes()},getPointsCollection:function(){return this.nodes||[]},indexateNodes:function(){this.nodes.forEach(function(a,
b){a.index=b})},markerAttribs:function(a,b){b=n.prototype.markerAttribs.call(this,a,b);f(a.plotY)||(b.y=0);b.x=(a.plotX||0)-(b.width/2||0);return b},translate:function(){this.processedXData||this.processData();this.generatePoints();this.deferLayout();this.nodes.forEach(function(a){a.isInside=!0;a.linksFrom.forEach(function(a){a.shapeType="path";a.y=1})})},deferLayout:function(){var a=this.options.layoutAlgorithm,b=this.chart.graphLayoutsStorage,c=this.chart.graphLayoutsLookup,e=this.chart.options.chart;
if(this.visible){b||(this.chart.graphLayoutsStorage=b={},this.chart.graphLayoutsLookup=c=[]);var d=b[a.type];d||(a.enableSimulation=f(e.forExport)?!e.forExport:a.enableSimulation,b[a.type]=d=new g.layouts[a.type],d.init(a),c.splice(d.index,0,d));this.layout=d;d.setArea(0,0,this.chart.plotWidth,this.chart.plotHeight);d.addElementsToCollection([this],d.series);d.addElementsToCollection(this.nodes,d.nodes);d.addElementsToCollection(this.points,d.links)}},render:function(){var a=this.points,b=this.chart.hoverPoint,
c=[];this.points=this.nodes;l.line.prototype.render.call(this);this.points=a;a.forEach(function(a){a.fromNode&&a.toNode&&(a.renderLink(),a.redrawLink())});b&&b.series===this&&this.redrawHalo(b);this.chart.hasRendered&&!this.options.dataLabels.allowOverlap&&(this.nodes.concat(this.points).forEach(function(a){a.dataLabel&&c.push(a.dataLabel)}),this.chart.hideOverlappingLabels(c))},drawDataLabels:function(){var a=this.options.dataLabels.textPath;n.prototype.drawDataLabels.apply(this,arguments);this.points=
this.data;this.options.dataLabels.textPath=this.options.dataLabels.linkTextPath;n.prototype.drawDataLabels.apply(this,arguments);this.points=this.nodes;this.options.dataLabels.textPath=a},pointAttribs:function(a,b){var c=b||a&&a.state||"normal";b=n.prototype.pointAttribs.call(this,a,c);c=this.options.states[c];a&&!a.isNode&&(b=a.getLinkAttributes(),c&&(b={stroke:c.linkColor||b.stroke,dashstyle:c.linkDashStyle||b.dashstyle,opacity:h(c.linkOpacity,b.opacity),"stroke-width":c.linkColor||b["stroke-width"]}));
return b},redrawHalo:b.redrawHalo,onMouseDown:b.onMouseDown,onMouseMove:b.onMouseMove,onMouseUp:b.onMouseUp,setState:function(a,b){b?(this.points=this.nodes.concat(this.data),n.prototype.setState.apply(this,arguments),this.points=this.data):n.prototype.setState.apply(this,arguments);this.layout.simulation||a||this.render()}},{setState:g.NodesMixin.setNodeState,init:function(){a.prototype.init.apply(this,arguments);this.series.options.draggable&&!this.series.chart.styledMode&&(e(this,"mouseOver",function(){d(this.series.chart.container,
{cursor:"move"})}),e(this,"mouseOut",function(){d(this.series.chart.container,{cursor:"default"})}));return this},getDegree:function(){var a=this.isNode?this.linksFrom.length+this.linksTo.length:0;return 0===a?1:a},getLinkAttributes:function(){var a=this.series.options.link,b=this.options;return{"stroke-width":h(b.width,a.width),stroke:b.color||a.color,dashstyle:b.dashStyle||a.dashStyle,opacity:h(b.opacity,a.opacity,1)}},renderLink:function(){if(!this.graphic&&(this.graphic=this.series.chart.renderer.path(this.getLinkPath()).add(this.series.group),
!this.series.chart.styledMode)){var a=this.series.pointAttribs(this);this.graphic.attr(a);(this.dataLabels||[]).forEach(function(b){b&&b.attr({opacity:a.opacity})})}},redrawLink:function(){var a=this.getLinkPath();if(this.graphic){this.shapeArgs={d:a};if(!this.series.chart.styledMode){var b=this.series.pointAttribs(this);this.graphic.attr(b);(this.dataLabels||[]).forEach(function(a){a&&a.attr({opacity:b.opacity})})}this.graphic.animate(this.shapeArgs);var c=a[0];a=a[1];"M"===c[0]&&"L"===a[0]&&(this.plotX=
(c[1]+a[1])/2,this.plotY=(c[2]+a[2])/2)}},getMass:function(){var a=this.fromNode.mass,b=this.toNode.mass,c=a+b;return{fromNode:1-a/c,toNode:1-b/c}},getLinkPath:function(){var a=this.fromNode,b=this.toNode;a.plotX>b.plotX&&(a=this.toNode,b=this.fromNode);return[["M",a.plotX||0,a.plotY||0],["L",b.plotX||0,b.plotY||0]]},isValid:function(){return!this.isNode||f(this.id)},remove:function(a,b){var c=this.series,e=c.options.nodes||[],d,f=e.length;if(this.isNode){c.points=[];[].concat(this.linksFrom).concat(this.linksTo).forEach(function(a){d=
a.fromNode.linksFrom.indexOf(a);-1<d&&a.fromNode.linksFrom.splice(d,1);d=a.toNode.linksTo.indexOf(a);-1<d&&a.toNode.linksTo.splice(d,1);n.prototype.removePoint.call(c,c.data.indexOf(a),!1,!1)});c.points=c.data.slice();for(c.nodes.splice(c.nodes.indexOf(this),1);f--;)if(e[f].id===this.options.id){c.options.nodes.splice(f,1);break}this&&this.destroy();c.isDirty=!0;c.isDirtyData=!0;a&&c.chart.redraw(a)}else c.removePoint(c.data.indexOf(this),a,b)},destroy:function(){this.isNode&&this.linksFrom.concat(this.linksTo).forEach(function(a){a.destroyElements&&
a.destroyElements()});this.series.layout.removeElementFromCollection(this,this.series.layout[this.isNode?"nodes":"links"]);return a.prototype.destroy.apply(this,arguments)}});""});l(h,"masters/modules/networkgraph.src.js",[],function(){})});
//# sourceMappingURL=networkgraph.js.map