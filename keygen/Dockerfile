FROM openjdk:11
VOLUME /tmp
RUN mkdir /application
COPY . /application
WORKDIR /application
RUN /application/mvnw install #if you use gradle change it to /application/gradlew build
RUN mv /application/target/*.jar /application/app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/application/app.jar"]