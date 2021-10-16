class Customer():

    def __init__(self, customerid, clicks, traffic):
        self.customerid = customerid
        #Set this item to store for clicks.
        self.clicks = clicks 
        #Set this item to store for traffic.
        self.traffic = traffic

    def retrieve(self):
        return self.customerid

    def results(self):
        clickval = []
        trafficval = []
        for index in range(5):
            print(10-index)
        return (self.customerid, self.clicks, self.traffic)