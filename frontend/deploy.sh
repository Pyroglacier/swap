aws s3 sync ./build s3://swap-dev.iconic.fun --delete &&\
aws cloudfront create-invalidation --path "/*" --distribution-id $DISTRIBUTION_ID
