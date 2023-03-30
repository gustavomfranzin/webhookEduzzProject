import express, { Request, Response } from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

const eventsReceived: any[] = [];

app.post("/hook", (req: Request, res: Response) => {
  const {
    trans_cod,
    trans_status,
  } = req.body;

  eventsReceived.push({ id: trans_cod, status: trans_status });

  res.sendStatus(200);
});

setInterval(() => {
  const outOfOrder = eventsReceived.filter((event, paidEventIndex) => {
    const isPaid = event.status === 3;

    if (!isPaid) {
      return false;
    }

    const openEventOfCurrentInvoice = eventsReceived.filter((event, openEventIndex) => {
      return event.id === event.id && event.status === 1 && openEventIndex > paidEventIndex;
    });

    return openEventOfCurrentInvoice.length > 0;
  });

  console.log('Events\n');
  for (const event of eventsReceived) {
    console.log(`id: ${event.id} - status: ${event.status}`);
  }
  console.log('\n');
  console.log(`${outOfOrder.length} events out of order`);
}, 10000);

app.listen(5000, () => console.log("express listening at port 5000!"));
