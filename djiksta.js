// https://www.hackerrank.com/challenges/dijkstrashortreach/problem

class Edge {
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.value = r;
    }
    crossingEdge(explored){
        if(explored[this.x] == undefined && explored[this.y] != undefined){
           return [this.y,this.x];
        }
        if(explored[this.x] != undefined && explored[this.y] == undefined){
           return [this.x,this.y];
        }
    }
    isCrossing(explored){
        return (explored[this.x] == undefined && explored[this.y] != undefined) || (explored[this.x] != undefined && explored[this.y] == undefined)
    }
}
function getNextVertex(explored,crossingEdges) {
    let edges = crossingEdges;
    let minScore = Infinity;
    let w;
    for(i in edges){
        let edge = edges[i];
        let crossingEdge = edge.crossingEdge(explored);
        let u = crossingEdge[0];
        let v = crossingEdge[1];
        let score = explored[u] + edge.value;
        if(score < minScore){
           w = v;
           minScore = score;
        }
    }
    return {key:w,score:minScore};
}
function getCrossingEdges(explored,edges) {
    let crossingEdges = [];
    for(i in edges){
        let edge = edges[i];
        if(edge.isCrossing(explored)){
            crossingEdges.push(edge);
        }
    }
    return crossingEdges;
}
function djikstra(s,n,m,edges) {
    explored = {};
    explored[s] = 0;
    while(Object.keys(explored).length < n){
        let w = getNextVertex(explored,getCrossingEdges(explored,edges));
        explored[w.key] = w.score;
    }
    return format(s,explored);
}
function format(s,explored) {
    delete explored[s];
    return Object.keys(explored).map(function(key) {
         return explored[key];
    });
}
function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n_temp = readLine().split(' ');
        var n = parseInt(n_temp[0]);
        var m = parseInt(n_temp[1]);
        let edges = [];
        for(var a1 = 0; a1 < m; a1++){
            var x_temp = readLine().split(' ');
            var x = parseInt(x_temp[0]);
            var y = parseInt(x_temp[1]);
            var r = parseInt(x_temp[2]);
            edges.push(new Edge(x,y,r));
        }
        var s = parseInt(readLine());
        console.log(djikstra(s,n,m,edges).join(" "));
    }
}
