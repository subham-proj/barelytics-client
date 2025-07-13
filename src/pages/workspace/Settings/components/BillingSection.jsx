import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock } from 'lucide-react';

const BillingSection = ({ plan }) => {
  return (
    <Card className="mb-6 opacity-60">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-6 h-6 text-muted-foreground" />
          <CardTitle className="text-xl md:text-2xl font-bold text-muted-foreground">Billing & Subscription</CardTitle>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              <Lock className="w-3 h-3" />
              Coming Soon
            </span>
          </div>
        </div>
        <CardDescription className="mb-6 text-muted-foreground">Manage your subscription and billing information</CardDescription>
        
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="font-semibold text-muted-foreground">Current Plan</div>
            <div className="text-muted-foreground text-sm">{plan.name} - {plan.price}</div>
            <div className="text-muted-foreground text-xs">Next billing: {plan.nextBilling}</div>
          </div>
          <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0" disabled>Active</Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <Button variant="outline" className="w-full md:w-auto" disabled>Change Plan</Button>
          <Button variant="outline" className="w-full md:w-auto" disabled>View Invoices</Button>
          <Button variant="outline" className="w-full md:w-auto" disabled>Update Payment Method</Button>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Billing and subscription management will be available in a future update.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSection; 