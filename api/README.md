



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

# Get the ecr repo url and change the value in the below command

#Tag image to ecr
docker tag eth-api:latest <erc_repo_url>/eth_api_erc_repo:latest
#Push image to ecr
docker push <erc_repo_url>/eth_api_erc_repo:latest




```