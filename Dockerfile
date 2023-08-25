FROM openjdk:17-jdk-slim-buster
ARG JAR_FILE=/build/libs/ui-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]
EXPOSE 3000