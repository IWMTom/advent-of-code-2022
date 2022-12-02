const { format } = require("date-fns");
require("better-logging")(console, {
  format: (ctx) => `${ctx.STAMP(format(new Date(), "dd/MM/yyyy HH:mm:ss.SSS"))} ${ctx.type} ${ctx.msg}`,
});
const { wait } = require("./utils");

const main = async () => {
  console.log("Advent of Code 2022");

  await wait(1000 * 1);

  console.log("Goodbye!");
};

main();
