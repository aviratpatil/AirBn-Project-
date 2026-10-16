export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 3; // Default fallback demo nights
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

export const formatDateDisplay = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const generateBookingId = () => {
  return 'HS-' + Math.floor(100000 + Math.random() * 900000);
};

export const calculateBookingPrice = (nightlyPrice, nights, cleaningFee = 100, serviceFeePercent = 0.12) => {
  const stayCost = nightlyPrice * nights;
  const serviceFee = Math.round(stayCost * serviceFeePercent);
  const occupancyTaxes = Math.round(stayCost * 0.08); // 8% local tourist taxes
  const total = stayCost + cleaningFee + serviceFee + occupancyTaxes;

  return {
    nights,
    nightlyRate: nightlyPrice,
    stayCost,
    cleaningFee,
    serviceFee,
    occupancyTaxes,
    total
  };
};
