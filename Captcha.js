const solveCaptcha = require('hcaptcha-solver');
 
(async () => {
    try {
      const response = await solveCaptcha('https://nooooder.xyz');
      console.log(response);
      // F0_eyJ0eXAiOiJKV1Q...
    } catch (error) {
      console.log(error);
    }
})();