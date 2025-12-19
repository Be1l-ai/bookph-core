import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

import { getServerSession } from "@bookph/core/features/auth/lib/getServerSession";
import { getClientSecretFromPayment } from "@bookph/core/features/ee/payments/pages/getClientSecretFromPayment";
import { shouldHideBrandingForEvent } from "@bookph/core/features/profile/lib/hideBranding";
import prisma from "@bookph/core/prisma";
import { BookingStatus } from "@bookph/core/prisma/enums";
import { paymentDataSelect } from "@bookph/core/prisma/selects/payment";
import { EventTypeMetaDataSchema } from "@bookph/core/prisma/zod-utils";
import type { inferSSRProps } from "@bookph/core/types/inferSSRProps";

export type PaymentPageProps = inferSSRProps<typeof getServerSideProps>;

const querySchema = z.object({
  uid: z.string(),
});

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { uid } = querySchema.parse(context.query);
  const session = await getServerSession({ req: context.req });

  const rawPayment = await prisma.payment.findUnique({
    where: {
      uid,
    },
    select: paymentDataSelect,
  });

  if (!rawPayment) return { notFound: true } as const;

  const { data, booking: _booking, ...restPayment } = rawPayment;

  const payment = {
    ...restPayment,
    data: data as Record<string, unknown>,
  };

  if (!_booking) return { notFound: true } as const;

  const { startTime, endTime, eventType, ...restBooking } = _booking;
  const booking = {
    ...restBooking,
    startTime: startTime.toString(),
    endTime: endTime.toString(),
  };

  if (!eventType) return { notFound: true } as const;

  if (eventType.users.length === 0 && !eventType.team) return { notFound: true } as const;

  const [user] = eventType?.users.length
    ? eventType.users
    : [{ name: null, theme: null, hideBranding: null, username: null }];
  const profile = {
    name: eventType.team?.name || user?.name || null,
    theme: (!eventType.team?.name && user?.theme) || null,
    hideBranding: await shouldHideBrandingForEvent({
      eventTypeId: eventType.id,
      team: eventType.team,
      owner: eventType.users[0] ?? null,
      organizationId: session?.user?.profile?.organizationId ?? session?.user?.org?.id ?? null,
    }),
  };

  if (
    ([BookingStatus.CANCELLED, BookingStatus.REJECTED] as BookingStatus[]).includes(
      booking.status as BookingStatus
    )
  ) {
    return {
      redirect: {
        destination: `/booking/${booking.uid}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      eventType: {
        ...eventType,
        metadata: EventTypeMetaDataSchema.parse(eventType.metadata),
      },
      booking,
      payment,
      clientSecret: getClientSecretFromPayment(payment),
      profile,
    },
  };
};
