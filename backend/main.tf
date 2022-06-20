data "aws_caller_identity" "current" {}

locals {
  id = "${var.stage}-${var.project_name}"
}

resource "random_string" "external_id" {
  length  = 12
  special = false
}

resource "aws_cognito_user_pool" "user_pool" {
  name = "${local.id}-user-pool"

  username_attributes      = ["phone_number"]
  auto_verified_attributes = ["phone_number"]
  sms_verification_message = "Your account activation code is {####}"

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  sms_configuration {
    sns_caller_arn = aws_iam_role.cognito_sms.arn
    external_id    = random_string.external_id.result
  }

  password_policy {
    minimum_length                   = 10
    require_lowercase                = true
    require_uppercase                = true
    require_numbers                  = true
    require_symbols                  = false
    temporary_password_validity_days = 2
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_phone_number"
      priority = 1
    }
  }

  schema {
    name                     = "name"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true

    string_attribute_constraints {
      min_length = 0
      max_length = 1048
    }
  }

  schema {
    name                     = "phone_number"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true

    string_attribute_constraints {
      min_length = 0
      max_length = 12
    }
  }

  schema {
    name                     = "role_name"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = false

    string_attribute_constraints {
      min_length = 0
      max_length = 1048
    }
  }

  schema {
    name                     = "company"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = false

    string_attribute_constraints {
      min_length = 0
      max_length = 1048
    }
  }
}

resource "aws_iam_role" "cognito_sms" {
  name = "${local.id}-sms-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "${random_string.external_id.result}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "cognito_sms" {
  role = aws_iam_role.cognito_sms.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sns:publish"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
POLICY
}

resource "aws_cognito_user_pool_client" "client" {
  name = "${local.id}-client"

  user_pool_id = aws_cognito_user_pool.user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]

  refresh_token_validity = 30
  access_token_validity  = 60
  id_token_validity      = 60

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  enable_token_revocation       = true
  prevent_user_existence_errors = "ENABLED"
}
