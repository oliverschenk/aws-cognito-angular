#!/bin/bash
set -e

export NAME='aws-cognito-angular'

DEPLOY_ACTION='apply'
DESTROY_ACTION='destroy'

DEFAULT_REGION='ap-southeast-2'
DEFAULT_STAGE='dev'

AWS_VAULT_PREFIX=''

REGION=$DEFAULT_REGION
STAGE=$DEFAULT_STAGE
ACTION=$DEPLOY_ACTION

function usage {
    echo "DESCRIPTION:"
    echo "  Script for deploying resources to AWS."
    echo ""
    echo "USAGE:"
    echo "  deploy.sh [-p credentials_profile] [-r region] [-s stage] [-d destroy]"
    echo ""
    echo "OPTIONS"
    echo "  -p   the credentials profile to use (uses aws-vault)"
    echo "  -r   region (default: ap-southeast-2)"
    echo "  -s   the stage to deploy [dev, test, prod] (default: dev)"
    echo "  -d   destroy"
}

function aws_exec {
    ${AWS_VAULT_PREFIX}$1
}

function pushd() {
    command pushd "$@" >/dev/null
}

function popd() {
    command popd "$@" >/dev/null
}

while getopts "p:r:s:d" option; do
    case ${option} in
    p) AWS_VAULT_PROFILE=$OPTARG ;;
    r) REGION=$OPTARG ;;
    s) STAGE=$OPTARG ;;
    d) ACTION=$DESTROY_ACTION ;;
    \?)
        echo "Invalid option: -$OPTARG" 1>&2
        usage
        exit 1
        ;;
    esac
done

if [[ -n "${VALIDATION_ERROR}" ]]; then
    usage
    exit 1
fi

if [[ -n "${AWS_VAULT_PROFILE}" ]]; then
    AWS_VAULT_PREFIX="aws-vault exec ${AWS_VAULT_PROFILE} -- "
fi

echo "=== Using the following parameters ==="
echo "Region: ${REGION}"
echo "Stage: ${STAGE}"
echo "Action: ${ACTION}"

echo ""
echo "=== Applying action: ${ACTION} on backend ==="
pushd ./backend
terraform init
aws_exec "terraform ${ACTION} --var aws_region=${REGION}"
popd

if [[ "${ACTION}" = "${DEPLOY_ACTION}" ]]; then

    pushd ./frontend/aws-cognito-angular

    echo ""
    echo "=== Installing dependencies ==="
    npm install --location=global @ionic/cli @angular/cli
    npm install

    echo ""
    echo "=== Building Angular project ==="
    ionic build

    popd

fi

echo ""
echo "Completed."
