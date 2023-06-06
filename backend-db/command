helm install mygraph https://github.com/neo4j-contrib/neo4j-helm/releases/download/4.4.3/neo4j-4.4.3.tgz --set acceptLicenseAgreement=yes --set neo4jPassword=password --set core.numberOfServers=3 --set readReplica.numberOfServers=1

kubectl rollout status \
    --namespace kube-system \
    StatefulSet/mygraph-neo4j-core \
    --watch

kubectl logs --namespace kube-system -l \
    "app.kubernetes.io/instance=mygraph,app.kubernetes.io/name=neo4j,app.kubernetes.io/component=core"

# Export Password
export NEO4J_PASSWORD=$(kubectl get secrets mygraph-neo4j-secrets --namespace kube-system -o jsonpath='{.data.neo4j-password}' | base64 -d)

# Change Password
kubectl run -it --rm cypher-shell \
    --image=neo4j:4.4.3-enterprise \
    --restart=Never \
    --namespace kube-system \
    --command -- ./bin/cypher-shell -u neo4j -p "$NEO4J_PASSWORD" -a neo4j://mygraph-neo4j.kube-system.svc.cluster.local "call dbms.routing.getRoutingTable({}, 'system');"

# Run shell directly
kubectl run -it --rm --image neo4j:4.4.4 cypher-shell -- cypher-shell -a bolt://mygraph-neo4j.default.svc.cluster.local

username=neo4j
password=password


- JSONPath support
kubectl get service/neo4j-nodeport -o json
kubectl get service/neo4j-nodeport -o=jsonpath='{@}'

kubectl get service/neo4j-nodeport -o=jsonpath='{.spec.ports[?(@.targetPort=='7687')].nodePort}'

minikube ip