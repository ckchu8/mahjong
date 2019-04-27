import { Winds, Suits, MeldTypes } from './constants.js';
import Meld from './meld.js';

export default class Hand {

  constructor() {
    this.melds = [];
    this.riichi = false;
    this.double_riichi = false;
    this.tsumo = false;
    this.one_shot = false;
    this.dora = 0;
    this.special_draw = false;
    this.seat_wind = Winds.EAST;
    this.round_wind = Winds.EAST;
    this.winning_tile = [];
  }

  addMeld(meld) {
    this.melds.push(meld);
  }

  createNextMeld(is_open, meld_type, tiles) {
    let id = this.melds.length,
        set_is_open = is_open || false,
        set_meld_type = meld_type || MeldTypes.CHI,
        set_tiles = tiles || [],
        meld = new Meld(set_is_open, set_meld_type, set_tiles, id);

    this.addMeld(meld);
    return meld;
  }

  addWinningTile(meld, tile){
    this.winning_tile = [meld, tile]
  }

  to_s() {
    let result = [];
    this.melds.forEach(meld => {
      result.push(meld.to_s());
    });
    return result.join("\n");
  }

  checkValid() {
    let normal_melds = 0,
        pairs = 0,
        tile_lookup = {},
        count = 0,
        too_many_tiles = false;

    this.melds.forEach(meld => {
      if(meld.tiles.length > 0) {
        if(meld.type === MeldTypes.PAIR) {
          ++pairs;
        }
        else {
          ++normal_melds;
        }
      }
      // stop checking each tile once we know we've run into an error
      if(!too_many_tiles) {
        meld.tiles.forEach(tile => {
          count = tile_lookup[tile.to_s()] || 0;
          tile_lookup[tile.to_s()] = ++count;
          if(count > 4) {
            too_many_tiles = true;
          }
        });
      }
    });

    let valid = true,
        message = [];

    if(!((normal_melds === 4 && pairs === 1) || (normal_melds === 0 && pairs === 7))) {
      valid = false;
      message.push('You do not have a valid hand combination.');
    }
    if(too_many_tiles) {
      valid = false;
      message.push("You have too many of a tile. (You can't have more than 4 of any tile.)");
    }
    
    return { valid: valid, message: message.join(' ') };
  }

  calculate() {
    let check_result = this.checkValid();
    if(!check_result.valid) {
      return { error: check_result.message };
    }

    let base_points = 0,
        han = 0,
        fu = 0;

    let yakus = []

    if(this.isYakuman(yakus)){
      base_points = 8000
    } else {
      han = this.determineHan(yakus)

      let num_dora = parseInt(this.dora)

      han += num_dora

      if(num_dora > 0){
        yakus.push(num_dora + ' Dora')
      }

      if(han < 5){
        fu = this.determineFu()
        base_points = fu * Math.pow(2, 2 + han)

        if(base_points > 2000){
          base_points = 2000
        }
      } else if(han == 5){
        base_points = 2000
      } else if (han < 8){
        base_points = 3000
      } else if(han < 11) {
        base_points = 4000
      } else if (han < 13){
        base_points = 6000
      } else {
        base_points = 8000
      }
    }

    let payments = null;

    if(this.seat_wind === Winds.EAST){
      if(this.tsumo){
        let two_x = Math.ceil(2*base_points / 100) * 100
        payments = [0, two_x]
      } else {
        let six_x = Math.ceil(6*base_points / 100) * 100
        payments = [0, six_x]
      }
    } else {
      if(this.tsumo){
        let two_x = Math.ceil(2*base_points / 100) * 100
        let one_x = Math.ceil(base_points / 100) * 100
        payments = [two_x, one_x]
      } else{
        let four_x = Math.ceil(4*base_points / 100) * 100
        payments = [0, four_x]
      }
    }

    return {
      hands: yakus,
      east_pay: payments[0],
      other_pay: payments[1],
      han: han,
      fu: fu
    }
  }

  isYakuman(yakus){
    let is_yakuman = false;

    if(this.isNineGates()){
      yakus.push('Nine Gates (Chuuren Pooto)')
      is_yakuman = true;
    }

    if(this.isFourConcealedPongs()){
      yakus.push('Four Concealed Pungs (Suu Ankou)')
      is_yakuman = true;
    }

    if(this.isFourKongs()){
      yakus.push('Four kongs (Suu Kan Tsu)')
      is_yakuman = true;
    }

    if(this.isAllGreens()){
      yakus.push('All Green (Ryuu Iisou)')
      is_yakuman = true;
    }

    if(this.isAllTerminals()){
      yakus.push('All Terminals (Chinrouto)')
      is_yakuman = true;
    }

    if(this.isAllHonors()){
      yakus.push('All Honours (Tsuu Iisou)')
      is_yakuman = true;
    }

    if(this.isBigDragons()){
      yakus.push('Big Three Dragons (Dai Sangen)')
      is_yakuman = true;
    }

    if(this.isLittleWinds()){
      yakus.push('Little Four Winds (Shou Suushii)')
      is_yakuman = true;
    }

    if(this.isBigWinds()){
      yakus.push('Big Four Winds (Dai Suushii)')
      is_yakuman = true;
    }

    if(this.isBigWheel()){
      yakus.push('Big Wheel (Dai Sharin)')
      is_yakuman = true;
    }

    return is_yakuman
  }

  determineHan(yakus){
    let han = 0,
        is_concealed = this.isConcealed();

    if(this.riichi){
      yakus.push('Riichi')
      han++
    }

    if(this.double_riichi){
      han+=2
      yakus.push('Double Riichi (Daburu Riichi')
    }

    if(this.one_shot) {
      han++
      yakus.push('One-shot (Ippatsu)')
    }

    if(this.special_draw){
      han++
      yakus.push('After a Kong, Robbing the Kong, or Under the Sea (Rinshan Kaihou, Chan Kan, Haitei, or Houtei)')
    }

    if(this.isConcealedSelfPick()){
      yakus.push('Fully Concealed Hand (Menzen Tsumo)')
      han++
    }

    if(this.isAllChis()){
      yakus.push('No Fu (Pinfu)')
      han++
    }

    if(this.isPureDoubleChow()){
      yakus.push('Pure Double Chow (Iipeikou)')
      han++
    }

    if(this.isSimples()){
      yakus.push('All Simples (Tanyao Chuu)')
      han++
    }

    if(this.isMixedTripleChow()){
      yakus.push('Mixed Triple Chow (San Shoku Doujun)')
      han++
      if(is_concealed){
        han++
      }
    }

    if(this.isStraight()){
      yakus.push('Pure Straight (Itsu)')
      han++
      if(is_concealed){
        han++
      }
    }

    let num_dragons = this.numDragons()

    if(num_dragons > 0)
    {
      han += num_dragons
      yakus.push(num_dragons + ' Dragon Pung (Yakuhai)')
    }

    if(this.isSeatWind()){
      han++
      yakus.push('Seat Wind (Yakuhai)')
    }

    if(this.isPrevalentWind()){
      yakus.push('Prevalent Wind (Yakuhai)')
      han++
    }

    if(this.isMixedTerminals()){
      yakus.push('Outside Hand (Chanta)')
      han++
      if(is_concealed){
        han++
      }
    }

    if(this.isSevenPairs()){
      yakus.push('Seven pairs (Chi Toitsu)')
      han+=2
    }

    if(this.isTriplePongs()){
      yakus.push('Triple Pung (San Shoku Dokou)')
      han+=2
    }

    if(this.isThreeConcealedPongs()){
      yakus.push('Three Concealed Pungs (San Ankou)')
      han+=2
    }

    if(this.isThreeKongs()){
      yakus.push('Three Kongs (San Kan Tsu)')
      han+=2
    }

    if(this.isAllPongs()){
      yakus.push('All Pungs (Toi-Toi Hou)')
      han+=2
    }

    if(this.isSemiPure()){
      yakus.push('Half Flush (Honitsu)')
      han+=2

      if(is_concealed){
        han++
      }
    }

    if(this.isLittleDragons()){
      yakus.push('Little Three Dragons (Shou Sangen)')
      han+=2
    }

    if(this.isAllTerminalsAndHonors()){
      yakus.push('All Terminals and Honours (Honroutou)')
      han+=2
    }

    if(this.isTerminals()){
      yakus.push('Terminals in All Sets (Junchan)')
      han+=2

      if(is_concealed){
        han++
      }
    }

    if(this.isTwiceDoubleChow()){
      yakus.push('Twice Pure Double Chows (Ryan Peikou)')
      han+=3
    }

    if(this.isPure()){
      yakus.push('Full Flush (Chinitsu)')
      han+=5

      if(is_concealed){
        han++
      }
    }

    return han
  }

  determineFu(){
    if(this.isSevenPairs()){
      return 25
    }

    let base = 20,
        is_concealed = this.isConcealed();

    if(is_concealed && !this.tsumo){
      base += 10
    }

    this.getPonKanMelds().forEach(function(meld) {
      let val = 2
      if(meld.isOuters() || meld.isHonors()){
        val *= 2
      }
      if(!meld.is_open){
        val *= 2
      }
      if(meld.isKan()){
        val *= 4
      }

      base += val
    })

    let pair = this.getPair();

    if(pair && pair.isDragon()){
      base += 2
    }

    if(pair && pair.isWind()){
      let base_value = pair.baseValue();
      if(base_value === this.seat_wind){
        base += 2
      }
      if(base_value === this.round_wind){
        base += 2
      }
    }

    if(this.tsumo && !this.isAllChis()){
      base += 2
    }

    // winning on edge, closed, or pair wait, +2
    if(!this.openWait() || this.melds[this.winningMeld()].isPair()){
      base += 2
    }

    // open pinfu (would have been all runs, but parts are not concealed) + 2
    if(!is_concealed &&
        this.getChiMelds().length === 4 &&
        this.pairIsntSpecial() &&
        this.openWait()
    ) {
      base += 2
    }

    return Math.ceil(base / 10) * 10
  }

  getChiMelds(){
    return this.melds.filter(meld => meld.isChi())
  }

  getPonMelds(){
    return this.melds.filter(meld => meld.isPon())
  }

  getPonKanMelds(){
    return this.melds.filter(meld => meld.isPon() || meld.isKan())
  }

  getKanMelds(){
    return this.melds.filter(meld => meld.isKan())
  }

  getPair(){
    return this.melds.filter(meld => meld.isPair())[0]
  }

  winningMeld(){
    return this.winning_tile.length > 0 ? this.winning_tile[0] : {};
  }

  winningTile(){
    return this.winning_tile.length > 1 ? this.winning_tile[1] : {};
  }

  isConcealed() {
    let concealed = true;

    for(let i = 0; i < this.melds.length; i++){
      if(this.melds[i].is_open && i !== this.winningMeld()) {
        concealed = false
      }
    }

    return concealed
  }

  isConcealedSelfPick(){
    return this.melds.every(function(meld) {
      return !meld.is_open
    }) && this.tsumo
  }

  isTriplePongs(){
    let pons = this.getPonKanMelds(),
        values = pons.map(pon => pon.baseValue())

    return values.some(function(val) {
      return pons.some(function(pon) {
        return pon.isDots() && pon.baseValue() == val
      }) && pons.some(function(pon) {
        return pon.isCharacters() && pon.baseValue() == val
      }) && pons.some(function(pon) {
        return pon.isSticks() && pon.baseValue() == val
      })
    })
  }

  isThreeConcealedPongs(){
    return this.getPonKanMelds().filter(meld => !meld.is_open).length == 3
  }

  isFourConcealedPongs(){
    return this.getPonKanMelds().filter(meld => !meld.is_open).length == 4
  }

  isThreeKongs(){
    return this.melds.filter(meld => meld.isKan()).length == 3
  }

  isFourKongs(){
    return this.melds.filter(meld => meld.isKan()).length == 4
  }

  isAllPongs(){
    return this.getPonKanMelds().length == 4
  }

  isPure(){
    let first_meld = this.melds[0]
    // Abort is first suit is honors
    if(first_meld.isHonors()){
      return false
    }

    // Ensure every suit matches first one
    let first_suit = first_meld.suit()
    return this.melds.every(function(meld) {
      return meld.suit() === first_suit
    })
  }

  isAllHonors(){
    return this.melds.every(function(meld) {
      return meld.isHonors()
    })
  }

  isSemiPure(){
    if(this.isPure() || this.isAllHonors()){
      return false
    }

    // Collect all melds that are not honors
    let non_honor_melds = this.melds.filter(meld => !meld.isHonors())
    return non_honor_melds.every(function(meld) {
      return meld.suit() == non_honor_melds[0].suit()
    })
  }

  isSimples(){
    return this.melds.every(function(meld) {
      return meld.isSimples()
    })
  }

  isTerminals(){
    return this.melds.every(function(meld) {
      return meld.isOuters()
    }) && !this.isAllPongs()
  }

  isAllTerminals(){
    return this.melds.every(function(meld) {
      return meld.isOuters()
    }) && this.isAllPongs()
  }

  isMixedTerminals(){
    // All outers and honors, at least one of each
    return this.melds.every(function(meld) {
      return meld.isOuters() || meld.isHonors()
    }) && this.melds.some(function(meld) {
      return meld.isOuters()
    }) && this.melds.some(function(meld) {
      return meld.isHonors()
    }) && !this.isAllPongs()
  }

  isAllTerminalsAndHonors() {
    return this.melds.every(function(meld) {
      return meld.isOuters() || meld.isHonors()
    }) && this.melds.some(function(meld) {
      return meld.isOuters()
    }) && this.melds.some(function(meld) {
      return meld.isHonors()
    }) && this.isAllPongs()
  }

  isSevenPairs(){
    return this.melds.length === 7 && this.melds.every(function(meld) {
      return meld.isPair()
    })
  }

  pairIsntSpecial(){
    let pair = this.melds.filter(meld => meld.isPair())[0]

    if(pair.isDragon()){
      return false
    }

    if(pair.isWind()){
      let base_value = pair.baseValue();
      if(base_value === this.seat_wind || base_value === this.round_wind){
        return false
      }
    }

    return true
  }

  isAllChis(){
    return this.isConcealed() &&
           this.getChiMelds().length == 4 &&
           this.pairIsntSpecial() &&
           this.openWait()
  }

  openWait(){
    let meld = this.melds[this.winningMeld()]

    if(!meld.isChi()){
      return true
    }

    // n-1,n+1 waiting on n
    if(this.winningTile() == 1){
      return false
    }

    // 8,9 waiting on 7
    if(this.winningTile() == 0 && meld.tiles[0].value == 7){
      return false
    }

    // 1,2 waiting on 3
    if(this.winningTile() == 2 && meld.tiles[2].value == 3){
      return false
    }

    return true
  }

  isMixedTripleChow(){
    let chis = this.getChiMelds(),
        values = chis.map(chi => chi.baseValue())

    return values.some(function(val) {
      return chis.some(function(chi) {
        return chi.isDots() && chi.baseValue() == val
      }) && chis.some(function(chi) {
        return chi.isCharacters() && chi.baseValue() == val
      }) && chis.some(function(chi) {
        return chi.isSticks() && chi.baseValue() == val
      })
    })
  }

  isStraight(){
    let chis = this.getChiMelds()

    return [Suits.DOTS, Suits.CHARACTERS, Suits.STICKS].some(function(suit) {
      return chis.some(function(chi) {
        return chi.suit() == suit && chi.baseValue() == 1
      }) && chis.some(function(chi) {
        return chi.suit() == suit && chi.baseValue() == 4
      }) && chis.some(function(chi) {
        return chi.suit() == suit && chi.baseValue() == 7
      })
    })
  }

  numDoubleChow(){
    let chis = this.getChiMelds(),
        count = 0,
        orig_meld = null;

    if(!this.isConcealed()) {
      return count
    }

    for (let i = 0; i < chis.length; i++) {
      for(let j = i + 1; j < chis.length; j++){
        if(chis[i].suit() == chis[j].suit() && chis[i].baseValue() == chis[j].baseValue()) {
          if (orig_meld == null || (orig_meld.suit() != chis[i].suit() && orig_meld.baseValue() != chis[i].baseValue())){
            count += 1
            orig_meld = chis[i]
          }
        }
      }
    }

    return count
  }

  isPureDoubleChow(){
    return this.numDoubleChow() == 1
  }

  isTwiceDoubleChow(){
    return this.numDoubleChow() == 2
  }

  numDragons(){
    return this.getPonKanMelds().filter(meld => meld.isDragon()).length
  }

  isLittleDragons(){
    return this.numDragons() == 2 && this.melds.some(function(meld){
      return meld.isPair() && meld.isDragon()
    })
  }

  isBigDragons(){
    return this.numDragons() == 3
  }

  numWinds(){
    return this.getPonKanMelds().filter(meld => meld.isWind()).length
  }

  isSeatWind(){
    let seat_wind = this.seat_wind
    return this.getPonKanMelds().filter(meld => meld.isWind()).some(function(wind){
      return wind.baseValue() == seat_wind
    })
  }

  isPrevalentWind(){
    let round_wind = this.round_wind
    return this.getPonKanMelds().filter(meld => meld.isWind()).some(function(wind){
      return wind.baseValue() == round_wind
    })
  }

  isLittleWinds(){
    return this.numWinds() == 3 && this.melds.some(function(meld){
      return meld.isPair() && meld.isWind()
    })
  }

  isBigWinds(){
    return this.numWinds() == 4
  }

  isAllGreens(){
    return this.melds.every(function(meld) {
      return meld.isGreen()
    })
  }

  isBigWheel(){
    return this.isPure() && this.isSimples() && this.isSevenPairs()
  }

  isNineGates(){
    if(!this.isConcealed()){
      return false
    }

    if(!this.isPure()){
      return false
    }

    let tiles = this.melds.flatMap(meld => meld.tiles)

    // At least three tiles are 1
    if(tiles.filter(tile => tile.value == 1).length < 3){
      return false
    }

    // At least three tiles are 9
    if(tiles.filter(tile => tile.value == 9).length < 3){
      return false
    }

    // At least one of each 2 - 8
    for(let i = 2; i <= 8; i++){
      if(tiles.filter(tile => tile.value == i).length == 0){
        return false
      }
    }

    return true
  }
}
