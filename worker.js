onmessage = function(e) {
    if (e.data === "start") {
      let sum = 0;
      for (let i = 0; i <= 1e8; i++) {
        sum += i;
      }
      postMessage(sum);
    }
  }