FROM rust:1.76-slim as builder

WORKDIR /home/app/src
COPY . .

RUN cargo build --release


FROM debian:12.5-slim

WORKDIR /home/app
COPY --from=builder /home/app/src/target/release/api .

CMD ["./api"]
