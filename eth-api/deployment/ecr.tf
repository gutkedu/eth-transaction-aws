resource "aws_ecr_repository" "ecr_repo" {
  name         = "eth_api_erc_repo"
  force_delete = true
}
