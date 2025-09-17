import z, { email } from "zod";

export const paymentSchema = z.object({
    cardNumber: z.string().refine(cardNumberChecker, "Le numéro de carte est invalide"),
    CVV: z.string().min(3, "Le CVV fait 3 caractères minimum").max(4, "Le CVV fait 4 caractères maximum").refine(CVVChecker, "Seuls les chiffres sont autorisés"),
    expiryDate: z.string().length(7, "La date d'expiration est invalide").refine(expiryDateFormatChecker, "La date d'expiration est invalide").refine(expiryDateChecker, "La date d'expiration est passée"),
    fullName: z.string().min(3, "Le nom est invalide")
});

function CVVChecker(CVV: string): boolean{
  const regex: RegExp = /[0-9]+/;
  return regex.test(CVV);
}

function cardNumberChecker(cardNumber: string): boolean{
    const regex: RegExp = /[0-9\- ]/;
    if(!regex.test(cardNumber)){
        return false;
    }
    cardNumber = cardNumber.replaceAll(/[^0-9]/g, "");

    // Algo de Luhn
    let sum: number = 0;
    let digit: number = 0;
    let isEven: boolean = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      digit = parseInt(cardNumber.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + Math.floor(digit / 10);
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 == 0;
}

function expiryDateFormatChecker(expiryDate: string): boolean{
    const regex: RegExp = /[0-3][0-9]\/[0-9]{4}/;
    return regex.test(expiryDate);
}

function expiryDateChecker(expiryDate: string): boolean{
    const month: number = parseInt(expiryDate.slice(0, 2));
    const year: number = parseInt(expiryDate.slice(3));

    const now = new Date();
    return (month >= now.getMonth()+1 && year === now.getFullYear()) || (year > now.getFullYear());
}

export const bookingSchema = z.object({
    park: z.coerce.number("Merci de sélectionner un parc").min(1, "Le parc sélectionné est invalide"),
    ticket: z.array(z.coerce.number().min(0, "Seuls les nombres positifs sont acceptés"), "Seuls les nombres sont acceptés pour le nombre de ticket"),
    bookingDate: z.coerce.date("Date de réservation invalide").min(new Date(), "La réservation doit avoir une date ultérieur à celle du jour"),
    lastName: z.string().min(1, "Le nom est obligatoire").max(50, "Le nom est trop long"),
    firstName: z.string().min(1, "Le prénom est obligatoire").max(50, "Le prénom est trop long"),
    email: z.email("L'email est invalide")
});