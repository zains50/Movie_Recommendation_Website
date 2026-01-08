

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Movie Recommendation Website</h3>

  <p align="center">
    A fully designed Movie Recommendation System from Scratch
    <!-- <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />\
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p> -->
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

We developed machine learning model for movie recommendation using the MovieLens-1M dataset. The model uses data of users and movies they have watched. Additional features were encoded such as movie metadata and posters to enrich the model and improve recommendation. 

After training, the machine learning model was deployed to a web application built with React for the frontend, FastAPI for the backend. Movie metadata and user data was stored and managed in a PostgreSQL database. For the full pipeline see [Model Pipline](#Model-Pipeline)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
* [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
* [![SQL](https://img.shields.io/badge/SQL-003B57?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

* [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
* [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
* [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

* [![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)
* [![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Machine Learning Pipeline
#### Data Collection 
We utilize the MovieLens 1M dataset which contains 1 million ratings from 6000 users across 3900 movies. Our model uses this data to learn differnt user preferences. The goal is to learn user preferences. For example, the model may learn that a user who is interested in horror movies also like action movies.  

We first engineer features for users and movies:

##### Movie Features
![alt text](pictures/movie_features.jpg)

We create features for the movie by utilizing genres, the movies poster as well as its plot. To capture genres, we apply one-hot encoding across 17 genre categories. We use open source models from [Hugging Face](https://huggingface.co/), [CLIP ViT-B/32](https://huggingface.co/sentence-transformers/clip-ViT-B-32) and [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2), to transform the poster and text summary into numerical embeddings. We then concat the genre vector and the 2 numerical embeddings for the machine learning model.

##### User Features
For each user we utilize their age, gener and occupation. We also incorporate the user's watch history in their feature vector.

<p align="center">
[gender, age, occupation, m₁, m₂, m₃, …, mₙ]
</p>

Where mₙ = 1 if the user has watched that movie and mₙ = 0 if the user has not watched that movie. 

#### Training Pipeline 
Our training pipeline consists of three main stages. 

1. **Initial Transformation**  
   We apply a linear transformation to the user and movie embeddings, projecting them into the same dimensional space.

$$
\mathbf{U}^{(1)} = \sigma \Big( \mathbf{W}_u^{(0)} \mathbf{U}^{(0)} + \mathbf{b}_u^{(0)} \Big)
\quad \quad 
\mathbf{M}^{(1)} = \sigma \Big( \mathbf{W}_m^{(0)} \mathbf{M}^{(0)} + \mathbf{b}_m^{(0)} \Big)
$$

$$
\text{Where}
- \(\mathbf{U}\) are the features of the users
- \(\mathbf{M}\) are the features of the movies
- \(\mathbf{W}  \ \text{and} \ \mathbf{b}\) are learnable parameters
$$

3. **Feature Enhancing**  
   We enrich user features by encoding the movies they have watched into their feature vector. To do this, we add the embeddings of all the movies the user has watched into their own feature vector. 
$$
\mathbf{U}_u^{(2)} = \mathbf{U}_u^{\text{(1)}} + \sum_{i \in \mathcal{M}_u} \mathbf{M}_i^{(1)}
$$
$$
Where 

- \(\mathbf{U}_u^{\text{(1)}}\) is the user's transformed feature vector (e.g., age, gender, occupation)  
- \(\mathcal{M}_u\) is the set of movies watched by user \(u\)  
- \(\mathbf{M}_i^{(1)}\) is the embedding vector of movie \(i\)
$$


4. **Deep Layer Transformations**  


    ![alt text](pictures/deep_layers2.jpg)
    
    We then pass movie and user embeddings through respective neural network towers. Each layer linearly transforms the embedding, applies a ReLU activation function for non-linearity and then a drop-out to prevent over fitting. 

5. **Final Feature Stacking**
    To generate the final features for users and movies, we take the average sum of all the features obtained each layer. 

#### Optimization and Loss Function 

To rate the probability of user U liking a movie M, we use a score function to generate the probability that the user U will watch the movie M. In our model we use the dot product. To optimize our model, we use Bayesian Personalized Ranking Loss to maximize the probablity of interacted with items over non-interacted with items. 

$$
\mathcal{L}_{\text{BPR}} = - \sum_{(u,i,j) \in \mathcal{D}} \ln \sigma \left( \hat{y}_{ui} - \hat{y}_{uj} \right)  + \lambda \|\Theta\|_2^2
$$

#### Model Parameters 

- **Embedding Size:** 512
- **Layers:** 2
- **Epochs:** 240
- **Weight Decay:** 1e-5
- **Learning Rate:** 0.001
- **Dropout:** 0.2

#### Evaluation 

![alt text](pictures/metrics.png)


