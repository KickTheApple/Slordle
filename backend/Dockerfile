# ---------- Stage 1: Build ----------
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /build

# Copy Gradle wrapper and config first (better caching)
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle.kts* settings.gradle.kts* ./

# Download dependencies (cached if build files unchanged)
RUN ./gradlew dependencies --no-daemon || true

# Copy application source
COPY src ./src

# Build the application
RUN ./gradlew bootJar --no-daemon


# ---------- Stage 2: Runtime ----------
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /build/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
