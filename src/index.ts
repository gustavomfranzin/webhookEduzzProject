import { eventsToCompare } from "./eventsToCompare";
import express, { Request, Response } from "express";


const app = express();

app.use(express.urlencoded({ extended: true }));

const eventsReceived: any[] = [];

const lastEvent = eventsToCompare[eventsToCompare.length - 1];
const invoices = eventsToCompare.map(event => event.id);

app.post("/hook", (req: Request, res: Response) => {
  const {
    trans_cod,
    trans_status,
  } = req.body;

  if (!invoices.includes(trans_cod)) {
    res.sendStatus(200);
    
    return;
  }

  eventsReceived.push({ id: trans_cod, status: trans_status });

  res.sendStatus(200);

  const isTheLastEvent = trans_cod == lastEvent.id && trans_status == lastEvent.status;

  if (!isTheLastEvent) {
    return;
  }

  if (isTheLastEvent) {
    const wrongEvents = eventsReceived.map((value, index) => {
      const isOk = value.id == eventsToCompare[index].id && value.status == eventsToCompare[index].status;

      return !isOk;
    });

    console.log(`${wrongEvents.length} eventos foram recebidos fora de ordem`);
  }

});

setInterval(() => {
  console.log('Eventos recebidos:');
  console.log('\n\n\n');
  for (const iterator of eventsReceived) {
    console.log(`id: ${iterator.id}, status: ${iterator.status}`);
  }
  console.log('\n\n\n');
}, 5000);

app.listen(5000, () => console.log("express listening at port 5000!"));
