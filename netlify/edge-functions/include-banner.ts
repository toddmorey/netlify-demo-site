import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  


  console.log("Including banner using Netlify Edge");
  
  // Get the page content
  const response = await context.next();
  const page = await response.text();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const eventDate = new Date('2022-11-22T10:00:00-07:00'); //date of event
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    timeZone: timeZone,
  });
  const localEventDateTime = formatter.format(eventDate);


  // Search for the placeholder
  const regex = /<\/html>/i;

  // Replace the content
  const bannerContent = "<div style='position:fixed;top:0;left:0;width:100%;padding:10px;background-color:black;color:white;z-index:1000;text-align:center'>Join us for a special launch event <strong style='color:#8CF4FF;'>"+localEventDateTime+"</strong> ("+context.geo.city+") </div></html>";
  const updatedPage = page.replace(regex, bannerContent);
  return new Response(updatedPage, response);
};

