resource "aws_ecs_task_definition" "backend_task" {
  family = "eth_api_backend_family"

  // Fargate is a type of ECS that requires awsvpc network_mode
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
  memory = "512"
  cpu    = "256"

  // Fargate requires task definitions to have an execution role ARN to support ECR images
  execution_role_arn = aws_iam_role.ecs_role.arn

  container_definitions = <<EOT
[
    {
        "name": "eth_api_container",
        "image": "683803546978.dkr.ecr.us-east-1.amazonaws.com/eth_api_erc_repo:latest",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": 3333,
                "hostPort": 3333
            }
        ]
    }
]
EOT
}

resource "aws_ecs_cluster" "backend_cluster" {
  name = "eth_api_backend_cluster"
}

resource "aws_ecs_service" "backend_service" {
  name = "eth_api_backend_service"

  cluster         = aws_ecs_cluster.backend_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn

  launch_type   = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets          = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
    security_groups  = ["${aws_security_group.security_group_eth_api.id}"]
    assign_public_ip = true
  }
}
