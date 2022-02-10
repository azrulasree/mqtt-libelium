var sensor = require("node-dht-sensor");
var mqtt = require("mqtt");
var client = mqtt.connect("ws://13.213.31.26:9001", {
  //open connection with your broker in AWS via websocket
  username:"khairi", //authenticate your broker with username and password
  password:"123",
});

sensor.read(11, 4, function (err, temperature, humidity) {
  //read sensor data from raspberry pi pin GPIO 4
  function timer(temp, humid) {
      client.publish(
        "mqtt/dht",
        JSON.stringify(`Temperature:${temp}C & Humidity:${humid}%`) //convert number to string
      ); //publish sensor data to broker on topic mqtt/dht

      console.log("topic published to the broker");
   
  }

  setInterval(timer, 5000, temperature, humidity); // send sensor data to broker every 5 seconds
});

