var anio = 2025;
var mes = 11; 
var dia = 13;
var horaCDMX = 0; 
var minutos = 0;
var segundos = 0;

var fechaObjetivo = new Date(anio, mes, dia, horaCDMX, minutos, segundos);

simplyCountdown('.simply-countdown-one', {
    year: fechaObjetivo.getFullYear(),
    month: fechaObjetivo.getMonth() + 1,
    day: fechaObjetivo.getDate(),
    hours: fechaObjetivo.getHours(),
    minutes: fechaObjetivo.getMinutes(),
    seconds: fechaObjetivo.getSeconds(),
    enableUtc: false, // 👈 usar hora local sin convertir a UTC
    zeroPad: true
});