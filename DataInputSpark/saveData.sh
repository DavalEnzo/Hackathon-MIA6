start-dfs.sh

hdfs dfs -mkdir /hackaton/
# Dossier hackaton contenant les données également créer en parallèle.
hdfs dfs -put olympic_results.html /hackaton
hdfs dfs -put olympic_hosts.xml /hackaton
hdfs dfs -put olympic_medals.xlsx /hackaton
hdfs dfs -put olympic_athletes.json /hackaton

pip3 install html5lib
pip3 install pandas
pip3 install lxml

pyspark --jars /home/parallels/Downloads/mysql-connector-java-8.0.27/mysql-connector-java-8.0.27.jar


