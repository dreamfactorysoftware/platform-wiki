{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllPrivilegesForEc2",
      "Action": [
        "ec2:*"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Sid": "ReadPermissionsOnSnowplowData",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersion",
        "s3:GetObjectVersionAcl"      
      ],
      "Resource": [
        "arn:aws:s3:::snowplow-saas-archive-eu-west-1/snplow2/events/*",
        "arn:aws:s3:::snowplow-saas-archive-eu-west-1/gforces/events/*"
      ],
      "Effect": "Allow"
    },
    {
      "Sid": "ListAccessOnDataBucket",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::snowplow-saas-archive-eu-west-1"],
      "Effect": "Allow"
    },
    {
      "Sid": "AllPermissionsOnAnalysisOutputBucket",
      "Action": [
        "s3:DeleteObject",
        "s3:DeleteObjectVersion",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersion",
        "s3:GetObjectVersionAcl",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:PutObjectVersionAcl"
        ],
        "Resource": [
          "arn:aws:s3:::qubole-analysis/*"
        ],
        "Effect": "Allow"
    },
    {
      "Sid": "ListAccessOnAnalysisBucket",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::qubole-analysis"],
      "Effect": "Allow"
    }  
  ]
}



