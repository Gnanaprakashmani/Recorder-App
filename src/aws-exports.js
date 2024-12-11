const awsConfig = {
    Auth: {
      region: "YOUR_REGION",
      userPoolId: "YOUR_USER_POOL_ID",
      userPoolWebClientId: "YOUR_APP_CLIENT_ID",
      authenticationFlowType: "USER_PASSWORD_AUTH",
    },
    Storage: {
      bucket: "YOUR_S3_BUCKET_NAME",
      region: "YOUR_REGION",
    },
  };
  
  export default awsConfig;