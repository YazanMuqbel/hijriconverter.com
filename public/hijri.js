(function (window) {
    var HijriJS = {
        toHijri: function (gregorianDate, separator = "-") {
            const date = new Date(gregorianDate);
            if (isNaN(date.getTime())) {
                return "Invalid Date";
            }

            const hijriFormatter = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            });

            const parts = hijriFormatter.formatToParts(date);
            const day = parts.find((part) => part.type === "day").value;
            const month = parts.find((part) => part.type === "month").value;
            const year = parts.find((part) => part.type === "year").value;

            return `${day}${separator}${month}${separator}${year} Hijri`;
        },
    };

    window.HijriJS = HijriJS;
})(window);
