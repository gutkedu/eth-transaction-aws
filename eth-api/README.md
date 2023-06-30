Application Overview

This application is built using a REST API and aims to provide functionality for Ethereum account management. It includes the following features:

    Generation of Private Key and Public Key: Implements a method to generate a Private Key and a Public Key using the Elliptic Curve Digital Signature Algorithm (ECDSA) with the secp256k1 elliptic curve. These keys are essential for creating Ethereum accounts.

    Obtaining Ethereum EOA (Wallet) Address: Implements a method to obtain the Ethereum EOA (Wallet) address from the Public Key generated using ECDSA.

Getting Started

To run the application, follow these steps:

    Clone the repository.
    Install the required dependencies.
    Build and deploy the Docker container.
    Access the application through the provided endpoints.

Usage

Once the application is up and running, you can interact with it using the following endpoints:

```bash
GET /keys
Description: Generates a Private Key and a corresponding Public Key using the ECDSA algorithm with the secp256k1 elliptic curve.
response: {
	"privateKey": "21ed26....",
	"publicKey": "0x040220...."
}

POST /address
Description: Retrieves the Ethereum EOA (Wallet) address associated with the provided Public Key.
body (json): {
  "publicKey": "0x04990397029684d636c...."
}
response: {
	"address": "0xbde31016f0d2e77..."
}
```


# Docker Container

To simplify deployment and execution, this application includes a Docker container. To set up and run the application using Docker, follow the instructions in the provided Dockerfile.

```bash
# Build the Docker image
docker build -f Dockerfile -t eth-api .
```

## Deployment

```bash
#Build image
docker build -f Dockerfile -t eth-api .

cd deployment/
# Init terraform
terraform init
# Plan terraform
terraform plan
# Apply terraform
terraform apply

#login to ecr
ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com"

# Get the ecr repo url and change the value in the below command
#Tag image to ecr
docker tag eth-api:latest <erc_repo_url>/eth_api_erc_repo:latest
#Push image to ecr
docker push <erc_repo_url>/eth_api_erc_repo:latest

# To remove the deployment
terraform destroy

```