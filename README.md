# redis-resilient

Esta é uma API Rest desenvolvida em Nodejs com a proposta de demonstrar permitir com que a conexão do **Redis** seja resiliente.

## Sobre o projeto

A ideia é demonstrar como permitir com que a conexão com o **Redis** seja mais resiliente. Caso algum erro de conexão ocorra, a aplicação ficará indisponível.

Para verificar como a aplicação se comporta com a indisponibilidade do **Redis**, basta iniciar um container Docker do **Redis** e depois interromper a execução com ```docker stop redis```
## Getting Started

### Pré-requisitos

1. [nodejs.org](https://nodejs.org)
2. [npmjs.com](https://www.npmjs.com) (includes node)
3. git clone https://github.com/leandroandrade/redis-resilient
3. cd ./redis-resilient/
4. npm install
5. npm start

### Executando docker:

**Serviço Redis**
```
docker run --name redis --memory=50m -p 6379:6379 -d redis:5
```

**Cliente Redis Web**
```
docker run --rm --name redis-commander -d --env REDIS_HOSTS=YOUR_IP_ADDR -p 8081:8081 rediscommander/redis-commander:latest
```

Email: leandro.andrade2588@gmail.com

Conecte-se comigo em [LinkedIn](http://www.linkedin.com/in/leandro-andrade)

