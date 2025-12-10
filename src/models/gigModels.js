// Gig Status Flow
export const GIG_STATUS = {
    OPEN_SLOT: 'open_slot',           // Vaga aberta pelo estabelecimento
    PENDING_APPLICATIONS: 'pending_applications', // Recebendo candidaturas
    PENDING_APPROVAL: 'pending_approval',         // Artista aplicou, aguardando aprovação
    DIRECT_INVITE: 'direct_invite',               // Convite direto do estabelecimento
    NEGOTIATING: 'negotiating',                   // Em negociação de valor
    PENDING_PAYMENT: 'pending_payment',           // Aprovado, aguardando pagamento
    BOOKED: 'booked',                             // Pago e confirmado
    COMPLETED: 'completed',                       // Show realizado
    CANCELLED: 'cancelled'                        // Cancelado
};

// Transaction Status
export const TRANSACTION_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};

// Gig Model
export const createGig = (data) => ({
    id: null,
    venueId: data.venueId,
    artistId: data.artistId || null,
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    genre: data.genre,
    budget: data.budget,
    status: data.status || GIG_STATUS.OPEN_SLOT,
    applicants: data.applicants || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    techRider: data.techRider || null,
    notes: data.notes || '',
    contractUrl: data.contractUrl || null,
    transactionId: data.transactionId || null
});

// Application Model (when artist applies to open slot)
export const createApplication = (data) => ({
    id: null,
    gigId: data.gigId,
    artistId: data.artistId,
    proposedValue: data.proposedValue || null,
    message: data.message || '',
    status: 'pending', // pending, approved, rejected
    createdAt: new Date().toISOString()
});

// Transaction Model
export const createTransaction = (data) => ({
    id: null,
    gigId: data.gigId,
    venueId: data.venueId,
    artistId: data.artistId,
    amount: data.amount,
    platformFee: data.platformFee || (data.amount * 0.1), // 10% fee
    artistAmount: data.amount - (data.platformFee || (data.amount * 0.1)),
    status: TRANSACTION_STATUS.PENDING,
    paymentMethod: data.paymentMethod || null,
    releaseDate: data.releaseDate || null, // D+1 after show
    createdAt: new Date().toISOString(),
    paidAt: null
});

// Notification Model
export const createNotification = (data) => ({
    id: null,
    userId: data.userId,
    type: data.type, // 'direct_invite', 'application_received', 'approved', 'rejected', 'payment_received'
    title: data.title,
    message: data.message,
    gigId: data.gigId || null,
    read: false,
    createdAt: new Date().toISOString()
});

// Artist Wallet Model
export const createWallet = (artistId) => ({
    artistId,
    availableBalance: 0,
    blockedBalance: 0,
    totalEarnings: 0,
    transactions: []
});
