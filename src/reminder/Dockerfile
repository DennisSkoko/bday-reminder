FROM rust:1-bookworm AS builder

WORKDIR /home/app/src
COPY . .

RUN cargo build --release


FROM debian:bookworm-slim

WORKDIR /home/app
COPY --from=builder /home/app/src/target/release/reminder .

# Needed by reqwest to verify the SSL when doing HTTPS requests
RUN apt-get update && apt-get install -y libssl3 ca-certificates

CMD ["./reminder"]
