# I take no responsibility in bloated Docker images. Proceed at your own risk. :)
FROM rust
COPY . .
CMD cargo unit-test