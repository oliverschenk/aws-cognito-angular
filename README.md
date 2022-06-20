# Amazon Cognito with SMS User Verification

This repo contains the code for the Medium article [Amazon Cognito with SMS user verification](https://medium.com/@oliver.schenk/amazon-cognito-with-sms-user-verification-8c0d90121faa)

Please note that the AWS resources created by this project are NOT free. Deploy at your own risk and destroy when no longer needed.

## Prerequisites

- Terraform
- AWS account with Administrator access
- Node JS
- Ionic CLI
- aws-vault (only required if using deployment script `deploy.sh`)
- Redux DevTools Chrome Extension (optional)

## Back-end

This repo contains two main parts - the back-end and the front-end.

The back-end is deployed using Terraform and the front-end can be run locally by using the Ionic CLI.

### Running terraform manually

This method assumes you have credentials set up appropriately.

```
terraform init
terraform apply
```

### Using the deploy script

This method assumes you have aws-vault configured.

You can configure the default region in the `deploy.sh` file or specify a region by using the `-r` flag as shown below.


```
./deploy.sh

DESCRIPTION:
  Script for deploying serverless lambda.

USAGE:
  deploy.sh -p credentials_profile [-r region] [-s stage] [-d destroy]

OPTIONS
  -p   the credentials profile to use (uses aws-vault)
  -r   region (default: ap-southeast-2)
  -s   the stage to deploy [dev, test, prod] (default: dev)
  -d   destroy
```

To apply
```
./deploy.sh -p <aws_vault_profile>
```

To destroy
```
./deploy.sh -p <aws_vault_profile> -d
```

## Front-end

Serve up the Ionic project. 

```
ionic serve
```

This app works best with a mobile phone sized view.
