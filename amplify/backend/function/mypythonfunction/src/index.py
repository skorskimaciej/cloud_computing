import boto3
import json


def handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('SensorsTable')

    measurements = table.scan()['Items']

    body = {
        "message": measurements
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(body),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    return response
