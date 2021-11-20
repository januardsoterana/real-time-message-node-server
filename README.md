# real-time-message-node-server
  This application built using Node.js, Express, Socket.io, Redis, RESTful Web Service.

# Installation

### Running Locally

Make sure you have Node.js and npm install.

  1. Clone or Download the repository 
    <pre>https://github.com/paulsoterana/real-time-message-node-server.git
    $ cd real-time-message-node-server</pre>
  2. Install Dependencies
      <pre>npm install</pre>
  3. Install Redis.
  
  4. Start the Application
     <pre>node index.js</pre>
  Application runs from localhost:8000.
      
 ## Sockets
    
   Having an active connection opened between the client and the server so client can send and receive data. This allows             real-time communication using TCP sockets. This is made possible by Socket.io.

   The client starts by connecting to the server through a socket(maybe also assigned to a specific namespace). Once connections is successful, client and server can emit and listen to events. 
