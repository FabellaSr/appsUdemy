const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Talleristas</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #8B4513;
    }
    .content {
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      background-color: #8B4513;
      color: #ffffff !important;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    h1 { color: #8B4513; font-size: 24px; }
    p { margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Talleristas</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Este correo fue enviado automáticamente por Talleristas.</p>
      <p>Por favor no responda a este mensaje.</p>
    </div>
  </div>
</body>
</html>
`;

export const passwordReset = (firstName: string, resetUrl: string) =>
  baseTemplate(`
    <h1>Restablecer contraseña</h1>
    <p>Hola ${firstName},</p>
    <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
    <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
    <p style="text-align: center;">
      <a href="${resetUrl}" class="button">Restablecer Contraseña</a>
    </p>
    <p>Este enlace expira en 1 hora.</p>
    <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
  `);

export const paymentApproved = (firstName: string, amount: string, type: string) =>
  baseTemplate(`
    <h1>Pago Aprobado</h1>
    <p>Hola ${firstName},</p>
    <p>Tu pago ha sido aprobado exitosamente.</p>
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tipo:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${type === 'COLLECTION' ? 'Pago por colección' : 'Mantenimiento mensual'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Monto:</strong></td>
        <td style="padding: 8px 0;">$${amount} MXN</td>
      </tr>
    </table>
    <p>Gracias por ser parte de Talleristas.</p>
  `);

export const paymentRejected = (firstName: string, amount: string, reason: string) =>
  baseTemplate(`
    <h1>Pago Rechazado</h1>
    <p>Hola ${firstName},</p>
    <p>Lamentamos informarte que tu pago no pudo ser procesado.</p>
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Monto:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">$${amount} MXN</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Motivo:</strong></td>
        <td style="padding: 8px 0;">${reason}</td>
      </tr>
    </table>
    <p>Por favor, verifica la información y vuelve a intentarlo.</p>
    <p>Si tienes dudas, contáctanos.</p>
  `);

export const collectionApproved = (firstName: string, collectionTitle: string) =>
  baseTemplate(`
    <h1>Colección Publicada</h1>
    <p>Hola ${firstName},</p>
    <p>¡Excelentes noticias! Tu colección ha sido aprobada y ya está publicada.</p>
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px 0;"><strong>Colección:</strong></td>
        <td style="padding: 8px 0;">${collectionTitle}</td>
      </tr>
    </table>
    <p>Tu trabajo ya es visible para todos los visitantes de Talleristas.</p>
    <p>¡Gracias por compartir tu talento!</p>
  `);

export const collectionRejected = (firstName: string, collectionTitle: string, reason: string) =>
  baseTemplate(`
    <h1>Colección No Aprobada</h1>
    <p>Hola ${firstName},</p>
    <p>Tu colección no pudo ser aprobada en este momento.</p>
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Colección:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${collectionTitle}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Motivo:</strong></td>
        <td style="padding: 8px 0;">${reason}</td>
      </tr>
    </table>
    <p>Por favor, realiza los ajustes necesarios y vuelve a enviarla para revisión.</p>
  `);

export const welcome = (firstName: string) =>
  baseTemplate(`
    <h1>¡Bienvenido a Talleristas!</h1>
    <p>Hola ${firstName},</p>
    <p>Gracias por unirte a nuestra comunidad de artesanos y talleristas.</p>
    <p>En Talleristas podrás:</p>
    <ul>
      <li>Crear tu perfil profesional</li>
      <li>Exhibir tu trabajo en colecciones de fotos</li>
      <li>Conectar con clientes potenciales</li>
      <li>Mostrar tu talento al mundo</li>
    </ul>
    <p>Para comenzar, completa tu perfil y crea tu primera colección.</p>
    <p style="text-align: center;">
      <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Ir al Dashboard</a>
    </p>
    <p>¡Éxito con tu trabajo!</p>
  `);
