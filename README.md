<h1 align="center">Cek Ladang</h1>
<p align="center">Capstone project bangkit 2024 - Cloud computing</p>

This service provides a robust API designed for the History feature, which manages and stores crop disease prediction results. It enables users to effortlessly track their analysis and plant progress over time. The prediction data is securely stored in Firestore, ensuring that the information remains well-organized, protected, and easily accessible whenever needed.

For the backend infrastructure, Cloud Storage is used to securely store the machine learning models for disease predictions. This ensures that the models are always available and ready for use. To optimize performance and reduce costs, this service is deployed via Cloud Run, activating the server only when necessary, in response to requests from the application. This serverless approach maximizes efficiency and ensures that resources are only consumed when needed.

Additionally, a landing page web for the Cek Ladang app has been created to introduce the platform to users. This page is hosted on App Engine, ensuring stable performance and delivering a seamless user experience.

By integrating Firestore, Cloud Storage, Cloud Run, and App Engine, this service provides a highly efficient, secure, and scalable environment that powers the Cek Ladang app. These technologies work together to make it easier for farmers to access the innovative crop disease detection tools developed, helping them make informed decisions about their plant health.


> Base url of this service is: http://0.0.0.0:8080/

The service available:


- History
  <pre>POST  /history/</pre>
  <pre>GET  /history/{historyId}</pre>
  <pre>PUT /history/{historyId}</pre>
  <pre>GET  /history/</pre>
  <pre>DEL /history/{historyId}</pre>

- Web Server
  <pre>POST  /predict/img</pre>
  <pre>POST  /predict/img</pre>
  <pre>POST  /predict/img</pre>
  <pre>POST  /predict/img</pre> 


# Authentications


By following this authentication process, you can securely access the service and enjoy its functionalities.

# Instructions
This project run in node js version 18.13.0. 

Install all dependencies with
```bash
npm install
```

<P>- development<p>

```bash
npm run start-dev
```
<p>- production<p>

```bash 
npm run start  
```

# Environment

In order to run this project, you need to configure the following environment variables:

```bash

PORT= {your server port}

# ML API Configuration Cloud Storage
MODEL_URL = {define your model}

# Configuration Firestore
gcloud auth login
gcloud config set project [PROJECT_ID]


```

<h2 align="center">Cloud Architecture</h2>
<a href="">
  <img src="https://github.com/CekLadang/CloudComputing/blob/main/assets/cc-architecture.png" />
</a>
<h2 align="center">Postman</h2>
<p align="center">Postman Testing</p>
<div align="center">
  <a href="">
    <img src="https://github.com/CekLadang/CloudComputing/blob/main/assets/api-testing.gif" />
  </a>
</div>

<h2 align="center">Cek Ladang Web</h2>

<div align="center">
  <a href="">
    <img src="https://github.com/CekLadang/CloudComputing/blob/main/assets/web.gif" />
  </a>
</div>
You can visit https://cekladang-444312.uc.r.appspot.com to learn more about the application and explore its features.



#### Dependencies:
* [@google-cloud/firestore](https://www.npmjs.com/package/@google-cloud/firestore) - A library for accessing Firestore from Google Cloud.
* [@hapi/hapi](https://www.npmjs.com/package/@hapi/hapi) - A framework for building robust and flexible backend servers.
* [@tensorflow/tfjs-node](https://www.npmjs.com/package/@tensorflow/tfjs-node) - TensorFlow.js library for Node.js, used for running machine learning models.
* [DotEnv](https://www.npmjs.com/package/dotenv) - A library for managing environment variables.

#### DevDependencies:
* [Nodemon](https://www.npmjs.com/package/nodemon) - A tool for Node.js development that automatically restarts the server when file changes are detected.


# Pull Requests

I'd be happy to review any pull requests that may better the TanamIn project, in particular if you have a bug fix, enhancement, or a new idea, you can contact us.
