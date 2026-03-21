# Use official Java image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy jar file
COPY target/*.jar app.jar

# Expose port (Render uses dynamic PORT, but this is fine)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","/app/app.jar"]