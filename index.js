const { format } = require("date-fns");
const { dayOne } = require("./days/01/solution");
const { dayTwo } = require("./days/02/solution");
const { dayThree } = require("./days/03/solution");
const { dayFour } = require("./days/04/solution");
const { dayFive } = require("./days/05/solution");
const { daySix } = require("./days/06/solution");
const { daySeven } = require("./days/07/solution");
const { dayEight } = require("./days/08/solution");
require("better-logging")(console, {
  format: (ctx) => `${ctx.STAMP(format(new Date(), "dd/MM/yyyy HH:mm:ss.SSS"))} ${ctx.type} ${ctx.msg}`,
});

const DAY_TO_RUN = 8;
const main = async () => {
  console.log("Advent of Code 2022");
  console.log(`Running solution for day ${DAY_TO_RUN}`);

  switch (DAY_TO_RUN) {
    case 1:
      await dayOne();
      break;
    case 2:
      await dayTwo();
      break;
    case 3:
      await dayThree();
      break;
    case 4:
      await dayFour();
      break;
    case 5:
      await dayFive();
      break;
    case 6:
      await daySix();
      break;
    case 7:
      await daySeven();
      break;
    case 8:
      await dayEight();
      break;
  }
};

main();
