const { format } = require("date-fns");
const { dayOne } = require("./days/01/solution");
require("better-logging")(console, {
  format: (ctx) => `${ctx.STAMP(format(new Date(), "dd/MM/yyyy HH:mm:ss.SSS"))} ${ctx.type} ${ctx.msg}`,
});

const DAY_TO_RUN = 1;
const main = async () => {
  console.log("Advent of Code 2022");
  console.log(`Running solution for day ${DAY_TO_RUN}`);

  switch (DAY_TO_RUN) {
    case 1:
      await dayOne();
      break;
  }

  console.log("Goodbye!");
};

main();
