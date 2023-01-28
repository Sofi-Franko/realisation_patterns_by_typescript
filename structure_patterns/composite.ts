// ----------COMPOSITION-------------
abstract class DeliveryItem {
  public items: DeliveryItem[] = [];

  addItem(item: DeliveryItem): void {
    this.items.push(item)
  }

  getItemPrices(): number {
    return this.items.reduce((acc: number, cur: DeliveryItem) => {
      return acc + cur.getPrice()
    }, 0)
  }

  // we dont know exactly how to calculate for each extension, so -> abstract
  abstract getPrice(): number
}

class Shop extends DeliveryItem {
  constructor(public deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee
  }
}

class Package extends DeliveryItem {
  getPrice(): number {
    return this.getItemPrices()
  }
}

class Thing extends DeliveryItem {
  constructor(private price: number) {
    super();
  }

  getPrice(): number {
    return this.price
  }
}
// --------------------------------

// ----------to test-------------

const shop = new Shop(60),
  dress = new Thing(4990),
  ring = new Thing(6050),
  necklace = new Thing(3000),
  earrings = new Thing(2200),
  bracelet = new Thing(1900),
  faceAccessoriesPack = new Package(),
  bodyAccessoriesPack = new Package()

shop.addItem(dress)

faceAccessoriesPack.addItem(ring)
faceAccessoriesPack.addItem(earrings)
shop.addItem(faceAccessoriesPack)

bodyAccessoriesPack.addItem(necklace)
bodyAccessoriesPack.addItem(bracelet)
shop.addItem(bodyAccessoriesPack)

console.log(`Total-------------------> `, shop.getPrice())
